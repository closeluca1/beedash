import React, { useEffect, useId, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

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

  const [seePass, setSeePass] = useState<boolean>(false)
  const [typePass, setTypePass] = useState<string>('password');

  const [verifyInputs, setVerifyInputs] = useState(false);

  const [warning, setWarning] = useState<string>('hidden')
  const [warningMessage, setWarningMessage] = useState<string>()

  function watchPass() {
    if (seePass === false) {
      setTypePass('password');
    } else if (seePass === true) {
      setTypePass('text');
    }
  }

  useEffect(() => {
    watchPass();
    handleSignButton();
    setWarningMessage(warningMessage);
  });

  function handleSignButton() {
    if (getEmail.length > 7 && getPass.length > 6) {
      setVerifyInputs(!false)
    } else {
      setVerifyInputs(!true)
    }
  };

  function handleWarningPanic() {
    setWarning('bg-red-600 visible');
    setWarningMessage(warningMessage);
    setTimeout(() => {
      setWarning('hidden');
      setWarningMessage('');
    }, 3500);
  }


  const signInWithAccount = async () => {
    setAuthing(true);


    await signInWithEmailAndPassword(auth, getEmail, getPass).then((response) => {
      navigate(import.meta.env.VITE_HOME);
    }).catch((error) => {
      setAuthing(false);

      handleWarningPanic();

      switch (error.code) {
        case 'auth/missing-email':
          setWarningMessage('Prencha o campo de E-mail');
          break;
        case 'auth/invalid-email':
          setWarningMessage('Tipo de E-mail inválido');
          break;
        case 'auth/internal-error':
          setWarningMessage('Algo errado não esta certo, tente novamente');
          break;
        case 'auth/wrong-password': case 'auth/user-not-found':
          setWarningMessage('E-mail ou Senha incorretos');
          break;
        case 'default':
          setWarningMessage('Algo errado não esta certo, tente novamente');
          break;
      }
    })
  };

  return (
    <div className='mt-10 md:mt-0 w-full min-h-[90vh] flex justify-center items-center px-5'>
      <div className='w-full md:max-w-5xl flex row flex-wrap-reverse'>

        <div className='w-full md:w-2/4 py-10 flex items-center justify-center px-5'>
          <img className='w-full h-auto' src={LoginThumb} alt='Registrar em beedash' />
        </div>

        <section className='w-full md:w-2/4 px-5'>

          <div className='bg-zinc-50 pb-5 rounded-sm'>

            <h1 className='text-center text-3xl italic font-medium mb-5 border-b-2 py-5'>beedash</h1>

            <div className={`w-full py-3 mb-4 px-11 text-center bg-red-600 ${warning}`}>
              <span className='text-zinc-50 font-semibold text-sm'>{warningMessage}</span>
            </div>

            <form className='w-full grid grid-1 justify-items-center px-5'>

              <Input
                label='E-mail'
                type='email'
                placeholder='Digite seu melhor e-mail'
                maxLength='30'
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                title='Formato de e-mail incorreto'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGetEmail(event.target.value)}
              />

              <div className='w-full px-5 flex flex-row items-center'>
                <Input
                  label='Senha'
                  type={typePass}
                  placeholder='Digite uma senha segura'
                  maxLength='50'
                  pattern='.{6,}'
                  title='Sua senha não pode ser fraca'
                  onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGetPass(event.target.value)}
                />
                <span className='ml-4 pt-3 cursor-pointer' onClick={() => setSeePass(!seePass)}>

                  {seePass ? <AiOutlineEye className='w-5 h-5' /> : <AiOutlineEyeInvisible className='w-5 h-5' />}

                </span>
              </div>

              <Button
                onClick={signInWithAccount}
                title='Entrar'
                disabled={!verifyInputs ? 'disable' : authing}
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
              <a href={import.meta.env.VITE_REGISTER} className='text-indigo-500 font-medium hover:text-indigo-900 transition-all duration-200'> Cadastre-se</a>
            </span>
          </div>

        </section>

      </div>
    </div>
  )
}