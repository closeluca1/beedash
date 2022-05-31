import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { Input } from '../../../components/input';
import { Button } from '../../../components/button';

import { createDataUserService } from '../../../contexts/register';

import RegisterThumb from '../../../assets/register_thumb.svg';

import { useEffect } from 'react';
import { db } from '../../../App';
import { doc, setDoc } from 'firebase/firestore';

export function Register() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState<boolean>(false);

  const [createEmail, setCreateEmail] = useState('');
  const [createPass, setCreatePass] = useState('');

  const { firsName, lastName, setFirsName, setLastName, setContractTerms, contractTerms } = createDataUserService();

  const [seePass, setSeePass] = useState<boolean>(false)
  const [typePass, setTypePass] = useState<string>('password');

  const [warning, setWarning] = useState<string>('hidden')
  const [warningMessage, setWarningMessage] = useState<string>()

  function handleAuthing() {
    setTimeout(() => {
      setAuthing(false);
    }, 3000)
  }

  function watchPass() {
    if (seePass === false) {
      setTypePass('password');
    } else if (seePass === true) {
      setTypePass('text');
    }
  }

  useEffect(() => {
    watchPass();
    setWarningMessage(warningMessage);
    handleAuthing();
  })

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
    setWarningMessage(warningMessage);
    setTimeout(() => {
      setWarning('hidden');
      setWarningMessage('');
    }, 3500);
  }

  function handleContractTerms() {
    setContractTerms(!contractTerms)
  }

  async function createAccount(e: any) {
    e.preventDefault();
    setAuthing(true);

    if (firsName == '' || firsName.length < 2 || lastName == '' || lastName.length < 2 || createEmail == '' || createEmail.length < 5 || createPass == '' || createPass.length < 6) {
      handleWarningAdvice();
      setWarningMessage('Preencha os campos vazios')
    }

    await createUserWithEmailAndPassword(auth, createEmail, createPass).then((response) => {

      
      updateProfile(response.user, {
        displayName: firsName,
      });
      
      setDoc(doc(db, "users", response.user.uid, 'user', 'personal'), {
        firsName,
        lastName,
        contractTerms,
        'registerDate': new Date().toString(),
      });

      setTimeout(() => {
        navigate(import.meta.env.VITE_HOME);
      }, 500);

    }).catch((error) => {
      handleAuthing();

      handleWarningPanic();

      switch (error.code) {
        case 'auth/email-already-in-use':
          setWarningMessage('E-mail inválido ou em uso');
          break;
        case 'auth/missing-email': case 'auth/invalid-email':
          setWarningMessage('Prencha o campo de E-mail');
          break;
        case 'auth/weak-password':
          setWarningMessage('Senha inválida, crie uma senha mais forte');
          break;
        case 'auth/internal-error':
          setWarningMessage('Algo errado não esta certo, tente novamente');
          break;
      }
    });
  }


  return (
    <div className='mt-10 md:mt-0 w-full min-h-[90vh] flex justify-center items-center px-5'>
      <div className='w-full md:max-w-5xl flex row flex-wrap'>
        <section className='w-full md:w-2/4 px-5'>

          <div className='bg-zinc-50 pb-10 pt-5 rounded-sm'>

            <h1 className='text-center text-3xl italic font-medium'>beedash</h1>
            <p className='text-center text-md font-normal mb-5 border-b-2 pb-5'>Cadastre-se para fazer networking</p>

            <div className={`w-full py-3 mb-4 px-11 text-center bg-red-600 ${warning}`}>
              <span className='text-zinc-50 font-semibold text-sm'>{warningMessage}</span>
            </div>

            <form
              className='w-full grid grid-1 justify-items-center px-5 transition-all duration-300'
            // onSubmit={createAccount}
            >
              <Input
                label='Nome'
                type='text'
                placeholder='Qual seu primeiro nome?'
                maxLength='40'
                pattern='^[a-zA-ZÀ-ÿ/" "]+$'
                title='Somente letras'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setFirsName(event.target.value)}
              />


              <Input
                label='Sobrenome'
                type='text'
                placeholder='Qual seu sobrenome?'
                maxLength='40'
                pattern='^[a-zA-ZÀ-ÿ/" "]+$'
                title='Somente letras'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setLastName(event.target.value)}
              />



              <Input
                label='E-mail'
                type='email'
                placeholder='Digite seu melhor e-mail'
                maxLength='30'
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                title='Formato de e-mail incorreto'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setCreateEmail(event.target.value)}
              />



              <div className='w-full px-5 flex flex-row items-center'>
                <Input
                  label='Senha'
                  type={typePass}
                  placeholder='Digite uma senha segura'
                  maxLength='50'
                  pattern='.{6,}'
                  title='Sua senha não pode ser fraca'
                  onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setCreatePass(event.target.value)}
                />
                <span className='ml-4 pt-3 cursor-pointer' onClick={() => setSeePass(!seePass)}>

                  {seePass ? <AiOutlineEye className='w-5 h-5' /> : <AiOutlineEyeInvisible className='w-5 h-5' />}

                </span>
              </div>

              <div className='w-full px-5 flex flex-row items-center pt-2'>
                <input onClick={() => handleContractTerms()} className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="checkbox" />
                <span className='pl-3 text-sm font-semibold'>Li e concordo com os <a href="#" className='text-indigo-500 hover:text-indigo-900 transition-all duration-200'>termos de uso</a>.</span>
              </div>

              <Button
                onClick={createAccount}
                title='Registrar'
                disabled={!contractTerms ? 'disable' : authing}
              />

            </form>

          </div>

          <div className='w-full bg-zinc-50 mt-5 py-5 text-center rounded-sm'>
            <span className='text-zinc-900'>
              Tem uma conta?
              <a href={import.meta.env.VITE_USER_LOGIN} className='text-indigo-500 font-medium hover:text-indigo-900 transition-all duration-200'> Conecte-se</a>
            </span>
          </div>

        </section>

        <div className='w-full md:w-2/4 py-10 flex items-center justify-center px-5'>

          <img className='w-full h-auto' src={RegisterThumb} alt='Registrar em beedash' />
        </div>

      </div>
    </div>
  )
}
