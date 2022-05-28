import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { Input } from '../../../components/input';
import { Button } from '../../../components/button';

import LoginThumb from '../../../assets/login_thumb.svg';

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
      console.log(response.user.getIdToken());
      navigate(import.meta.env.VITE_USER_DASHBOARD);
    }).catch((error) => {
      console.log(error.code);
      setAuthing(false);      
    })
  };

  return (
    <div className='mt-10 md:mt-0 w-full min-h-[90vh] flex justify-center items-center px-5'>
      <div className='w-full md:max-w-5xl flex row flex-wrap-reverse'>
        
        <div className='w-full md:w-2/4 py-10 flex items-center justify-center'>
          <img className='w-full h-auto' src={LoginThumb} alt="" />
        </div>

        <section className='w-full md:w-2/4 px-5'>

          <div className='bg-zinc-50 py-10 rounded-sm'>

            <h1 className='text-center text-3xl italic font-medium mb-5'>beedash</h1>


            <form className='w-full grid grid-1 justify-items-center px-5'>

              <Input
                label='E-mail'
                type='email'
                placeholder='E-mail'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGetEmail(event.target.value)}
              />

              <Input
                label='Senha'
                type='password'
                placeholder='Senha'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGetPass(event.target.value)}
              />

              <Button
                onClick={() => signInWithAccount()}
                title='Entrar'
              />

            </form>

            <div className='w-full grid grid-1 justify-items-center mt-10'>
              <a href='#'>
                <span className='text-sm text-indigo-500 hover:text-indigo-900 transition-all duration-200'>Esqueceu a senha?</span>
              </a>
            </div>
          </div>

            <div className='w-full bg-zinc-50 mt-5 py-5 text-center rounded-sm'>
                <span className='text-zinc-900'>
                  Não tem uma conta? 
                  <a href="#" className='text-indigo-500 font-medium hover:text-indigo-900 transition-all duration-200'> Cadastre-se</a>
                </span>
            </div>

        </section>

      </div>
    </div>
  )
}