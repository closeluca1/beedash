import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { db } from '../../App';

import { getAuth, getRedirectResult, onAuthStateChanged, signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";

import { useNavigate } from 'react-router-dom';

interface StateUserProps {
  children: ReactNode;
}

interface ServiceStateUserProps {

}

export const ServiceContext = createContext({} as ServiceStateUserProps);

export const StateUserService = ({ children }: StateUserProps) => {

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user && auth.currentUser) {

      // console.log(user.uid)

      if (location.pathname === '/') {
        console.log('login')
        useEffect(() => {
          navigate('/perfil')
        })
      }

    } else {
      // User is signed out
      // ...
    }
  });



  return (
    <ServiceContext.Provider value={{}}>
      {children}
    </ServiceContext.Provider>
  );
}

export function verifyStateUserService() {
  return useContext(ServiceContext);
}
