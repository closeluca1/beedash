import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

export function Dashboard() {
  const auth = getAuth();  

  return (
    <div>
      <p>Dashboard</p>
      <button
        onClick={() => signOut(auth)}
      >sair</button>
    </div>
  )
}