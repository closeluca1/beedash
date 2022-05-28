import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { db } from '../../App';

import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';

interface UserProvideProps {
  children: ReactNode;
}

interface ServiceUserProps {
  getUserToken: any;
  docUser: string;
  setDocUser: any;
  setGetName: any;
  setGetLastName: any;
}

export const ServiceContext = createContext({} as ServiceUserProps);

export const RegisterService = ({ children }: UserProvideProps) => {

  const [docUser, setDocUser] = useState<null | any>()

  const [firstName, setGetName] = useState('');
  const [lastName, setGetLastName] = useState('');

  // const [registerDate] = useState<any>(new Date().toString());
  const [userUid] = useState<string>('');
  // const [description, setDescription] = useState<null | string>('Ola, este é meu perfil beedash. (:')
  // const [beFan, setBeFan] = useState<object>();
  // const [myFans, setMyFans] = useState<object>();
  // const [mygroup] = useState<object>();
  // const [associate] = useState<object>();
  // const [icon] = useState<string>();

  function getUserToken() {
    setDoc(doc(db, "users", docUser, 'user', 'personal'), {
      firstName,
      lastName,
      'registerDate': new Date().toString(),
    });

    setDoc(doc(db, 'users', docUser, 'user', 'permissions'), {
      'post': true,
      'group': false
    });

    setDoc(doc(db, 'users', docUser, 'user', 'profile'), {
      'myFans': {},
      'beFan': {},
      'myGroup': {},
      'associate': {},
      'description': 'Olá, este é meu perfil beedash. (:',
    });
  }

  return (
    <ServiceContext.Provider value={{ getUserToken, docUser, setDocUser, setGetName, setGetLastName }}>
      {children}
    </ServiceContext.Provider>
  )
}

export function createDataUserService() {
  return useContext(ServiceContext)
}