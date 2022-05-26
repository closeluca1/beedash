import React, { useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import 'dotenv';

export interface AuthRouteProps {
  children: string | any;
}

const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
  
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log('usuário ou senha incorreto');
        navigate('/');
      }
    });

    return () => AuthCheck();
  }, [auth]);

  

  if (loading) return <>entrando ...</>

  return (
    <>{ children }</>
  )
}

export default AuthRoute;