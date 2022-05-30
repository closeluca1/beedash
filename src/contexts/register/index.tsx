import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface UserProvideProps {
  children: ReactNode;
}

interface ServiceUserProps {
  setFirsName: any;
  setLastName: any;
  firsName: string;
  lastName: string;
  setContractTerms: any;
  contractTerms: boolean;
}

export const ServiceContext = createContext({} as ServiceUserProps);

export const RegisterService = ({ children }: UserProvideProps) => {

  const [firsName, setFirsName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [contractTerms, setContractTerms] = useState<boolean>(false);

  return (
    <ServiceContext.Provider value={{ setFirsName, setLastName, firsName, lastName, setContractTerms, contractTerms }}>
      {children}
    </ServiceContext.Provider>
  )
}

export function createDataUserService() {
  return useContext(ServiceContext)
}