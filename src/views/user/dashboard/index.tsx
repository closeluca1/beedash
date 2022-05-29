import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { VerifyLogin } from '../../../contexts/auth';

export function Dashboard() {
  const auth = getAuth();  
  const { setLogin, login } = VerifyLogin();

  function getOut () {
    setLogin(false);
    console.log(login)
    signOut(auth)
  }

  return (
    <div className='mt-10'>
      <p>Dashboard</p>
      <button
        onClick={getOut}
      >sair</button>
    </div>
  )
}