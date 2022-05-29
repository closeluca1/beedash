import React, { useContext, useEffect, useState, createContext, ReactNode} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



export interface AuthRouteProps {
  children: ReactNode;

}

interface LoginProps {
  login: boolean;
  setLogin: any;
}

export const LoginContext = createContext({} as LoginProps);

const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
  
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  
  const [login, setLogin] = useState<boolean>(false); 

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setLogin(true);
      } else {
        console.log('usuário ou senha incorreto');
        setLogin(false);
        navigate('/');
      }
    });

    return () => AuthCheck();
  }, [auth]);


  if (loading) return <>entrando ...</>

  return (
    <LoginContext.Provider value={{login, setLogin}}>
      { children }
    </LoginContext.Provider>

  )
}

export function VerifyLogin () {
  return useContext(LoginContext)
}

export default AuthRoute;