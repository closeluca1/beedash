import React, { useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export interface AuthRouteProps {
  children: string | any;
}

const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
  
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    AuthCheck();
    return () => AuthCheck();
  }, [auth]);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
    } else {
      console.log('usuário ou senha incorreto');
      navigate('/');
    }
  });

  if (loading) return <>entrando ...</>

  return (
    <>{ children }</>
  )
}

export default AuthRoute;