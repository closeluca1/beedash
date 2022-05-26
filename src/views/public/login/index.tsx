import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import 'dotenv';

export function Login() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState<boolean>(false);

  const [getEmail, setGetEmail] = useState<string>('');
  const [getPass, setGetPass] = useState<string>('');

  const signInWithAccount = async () => {
    setAuthing(true);

    await signInWithEmailAndPassword(auth, getEmail, getPass).then((response) => {
      console.log(response.user.providerData);
      navigate(import.meta.env.VITE_USER_DASHBOARD);
    }).catch((error) => {
      console.log(error.code);
      setAuthing(false);
    })
  }

  return (
    <div>
      <form>
        <input
          type="email"
          placeholder='E-mail'
          required
          onChange={(event) => setGetEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder='Senha'
          required
          onChange={(event) => setGetPass(event.target.value)}
        />

        <button
          onClick={() => signInWithAccount()}
          disabled={authing}
        >entrar</button>
      </form>
    </div>
  )
}