import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import 'dotenv';

export function Dashboard() {
  const auth = getAuth();
  const navigate = useNavigate();

  const getOut = () => {
    auth;
    navigate(import.meta.env.VITE_HOME)
  }

  return (
    <div>
      <p>Dashboard</p>
      <button
        onClick={() => getOut()}
      >sair</button>
    </div>
  )
}