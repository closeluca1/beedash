import { createContext, ReactNode, useContext, useEffect, useState } from 'react';


import 'dotenv';

import { db } from '../../App';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';

interface UserProvideProps {
  children: ReactNode;
}

interface ServiceUserProps {
  getUserToken: any;
  docUser: string;
  setDocUser: any;
  setFirsName: any;
  setLastName: any;
  firsName: string;
  lastName: string;
}

export const ServiceContext = createContext({} as ServiceUserProps);

export const RegisterService = ({ children }: UserProvideProps) => {


  const [docUser, setDocUser] = useState<null | any>()

  const [firsName, setFirsName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');


  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // const validate = { docUser: user.uid }
  //       if (auth.currentUser) {
  //         setDocUser(auth.currentUser.uid)
  //         try {
  //           getUserToken()
  //           navigate(import.meta.env.VITE_HOME);
  //         } catch (error) {
  //           console.log(error)
  //         }
  //       }
  //     }
  //   });
  // }, [])


  function getUserToken() {
    console.log(firsName)
    console.log(lastName)
    console.log(docUser)
    setDoc(doc(db, "users", docUser, 'user', 'personal'), {
      firsName,
      lastName,
      'registerDate': new Date().toString(),
      'social': {
        'github': '',
        'linkedin': '',
        'instagram': '',
        'tiktok': '',
        'youtube': '',
        'site': '',
        'other': '',
      }
    });

    setDoc(doc(db, 'users', docUser, 'user', 'permissions'), {
      'post': true,
      'group': false
    });

    setDoc(doc(db, 'users', docUser, 'user', 'profile'), {
      'followers': {},
      'following': {},
      'myGroup': {},
      'associate': {},
      'description': 'Olá, este é meu perfil beedash. (:',
      'roles': {
        'developer': [
          'FrontEnd',
          'BackEnd',
          'fullstack',
          'Mobile',
          'Web',
          'Desktop',
          'Games',
        ],
        'creator': [
          'Design',
          'Social Media',
          'Video Maker',
          'Writer',
          'Photograph',
        ],
        'level': [0, 1, 2, 3, 4, 5]
      }
    });
  }

  return (
    <ServiceContext.Provider value={{ getUserToken, docUser, setDocUser, setFirsName, setLastName, firsName, lastName }}>
      {children}
    </ServiceContext.Provider>
  )
}

export function createDataUserService() {
  return useContext(ServiceContext)
}