import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import 'dotenv'

export function Error404() {

  const auth = getAuth();

  const [verifyUser, setVerifyUser] = useState<string | null>()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setVerifyUser(import.meta.env.VITE_USER_DASHBOARD);
    } else {
      setVerifyUser(import.meta.env.VITE_USER_LOGIN);
    }
  });

  return (
    <div className='w-full min-h-[90vh] flex flex-col items-center justify-center'>
      <h5 className='text-lg'>Algo errado não esta certo!</h5>
      <a href={`${verifyUser}`}><h6 className='text-sm text-indigo-500 hover:text-indigo-900 transition-all duration-200'>voltar para página inicial</h6></a>
    </div>
  )
} 