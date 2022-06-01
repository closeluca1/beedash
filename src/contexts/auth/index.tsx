import React, { useContext, useEffect, useState, createContext, ReactNode} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



export interface AuthRouteProps {
  children: ReactNode;

}

interface LoginProps {
  login: boolean;
  setLogin: any;
  setUserName: any | undefined | null;
  userName: string | undefined | null;
}

export const LoginContext = createContext({} as LoginProps);

const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
  
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  
  const [login, setLogin] = useState<boolean>(false); 

  const [userName, setUserName] = useState<string | null>()

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        setLoading(false);
        setLogin(true);
        
        setUserName(user.displayName);

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
    <LoginContext.Provider value={{login, setLogin, setUserName, userName}}>
      { children }
    </LoginContext.Provider>

  )
}

export function VerifyLogin () {
  return useContext(LoginContext)
}

export default AuthRoute;