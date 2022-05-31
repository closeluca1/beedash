import React, { useEffect, useId, useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { Input } from '../../../components/input';
import { Button } from '../../../components/button';

import 'dotenv';

export function ForgotPassword() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState<boolean>(false);

  const [getEmail, setGetEmail] = useState<string>('');

  const [verifyInputs, setVerifyInputs] = useState(false);

  const [warning, setWarning] = useState<string>('hidden')
  const [warningMessage, setWarningMessage] = useState<string>()
  useEffect(() => {
    handleSignButton();
    setWarningMessage(warningMessage);
  });

  function handleSignButton() {
    if (getEmail.length > 7) {
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

  function handleWarningAdvice() {
    setWarning('bg-cyan-400 visible');
    setWarningMessage('O e-mail de recuperação foi enviado com sucesso');
  }


  const signInWithAccount = async () => {
    setAuthing(true);


    await sendPasswordResetEmail(auth, getEmail).then((response) => {
      setVerifyInputs(false)
      handleWarningAdvice()

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
          setWarningMessage('O E-mail parece estar errado');
          break;
        case 'default':
          setWarningMessage('Algo errado não esta certo, tente novamente');
          break;
      }
    })
  };

  return (
    <div className='mt-10 md:mt-0 w-full min-h-[90vh] flex justify-center items-center px-5'>

      <section className='w-full md:w-2/5 px-5'>

        <div className='bg-zinc-50 pb-10 pt-5 rounded-sm'>

          <h1 className='text-center text-3xl italic font-medium'>beedash</h1>
          <p className='text-center text-md font-normal mb-5 border-b-2 pb-5'>Enviaremos um e-mail de recuperação</p>

          <div className={`w-full py-3 mb-4 px-11 text-center bg-red-600 ${warning}`}>
            <span className='text-zinc-50 font-semibold text-sm'>{warningMessage}</span>
          </div>

          <form className='w-full grid grid-1 justify-items-center px-5'>

            <Input
              label='E-mail'
              type='email'
              placeholder='Digite o e-mail de sua conta'
              maxLength='30'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              title='Formato de e-mail incorreto'
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGetEmail(event.target.value)}
            />

            <Button
              onClick={signInWithAccount}
              title='Enviar pedido'
              disabled={!verifyInputs ? 'disable' : authing}
            />

          </form>

          <div className='w-full grid grid-1 justify-items-center mt-10'>
            <a href={import.meta.env.VITE_USER_LOGIN}>
              <span className='text-sm text-indigo-500 hover:text-indigo-900 transition-all duration-200'>Votar ao login</span>
            </a>
          </div>
        </div>

        <div className='w-full bg-zinc-50 mt-5 py-5 text-center rounded-sm'>
          <span className='text-zinc-900'>
            Ou se preferir, pode criar uma
            <a href={import.meta.env.VITE_REGISTER} className='text-indigo-500 font-medium hover:text-indigo-900 transition-all duration-200'> nova conta</a>
          </span>
        </div>

      </section>

    </div>
  )
}