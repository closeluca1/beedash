import React, { FormEvent, SetStateAction, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { Input } from '../../../components/input';
import { Button } from '../../../components/button';

import { createDataUserService } from '../../../contexts/register';

import RegisterThumb from '../../../assets/register_thumb.svg';

import 'dotenv';

export function Register() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState<boolean>(false);

  const [createEmail, setCreateEmail] = useState('');
  const [createPass, setCreatePass] = useState('');

  const { getUserToken, setDocUser, docUser, firsName, lastName, setFirsName, setLastName } = createDataUserService();

  const createAccount = async (e: any) => {
    e.preventDefault();
    setAuthing(true);

    // try {
    //   await console.log(
    //     firsName,
    //     lastName,
    //     createEmail,
    //     createPass,
    //   )
    // } catch (error) {
    //   console.log(error)
    // }

    await createUserWithEmailAndPassword(auth, createEmail, createPass).then((response) => {

      try {
        
        const validateUser = setDocUser(response.user.uid)
        console.log(response.user.uid)
        getUserToken(validateUser)
      } catch (error) {
        console.log(error)
      }

      setTimeout(() => {
        navigate(import.meta.env.VITE_USER_VITE_HOME);
      }, 1000);
    }).catch((error) => {
      console.log(error);
      setAuthing(false);
    })

  };

  return (
    <div className='mt-10 md:mt-0 w-full min-h-[90vh] flex justify-center items-center px-5'>
      <div className='w-full md:max-w-5xl flex row flex-wrap-reverse'>
        <section className='w-full md:w-2/4 px-5'>

          <div className='bg-zinc-50 py-10 rounded-sm'>

            <h1 className='text-center text-3xl italic font-medium'>beedash</h1>
            <p className='text-center text-md font-normal mb-5'>Cadastre-se para fazer networking</p>

            <form
              className='w-full grid grid-1 justify-items-center px-5'
            // onSubmit={createAccount}
            >
              <Input
                label='Nome'
                type='text'
                placeholder='Qual seu primeiro nome?'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setFirsName(event.target.value)}
              />


              <Input
                label='Sobrenome'
                type='text'
                placeholder='Qual seu sobrenome?'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setLastName(event.target.value)}
              />


              <Input
                label='E-mail'
                type='email'
                placeholder='Digite seu melhor e-mail'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setCreateEmail(event.target.value)}
              />

              <Input
                label='Senha'
                type='password'
                placeholder='Digite uma senha segura'
                onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setCreatePass(event.target.value)}
              />

              <Button
                onClick={createAccount}
                title='Registrar'
                disabled={authing}
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

        <div className='w-full md:w-2/4 py-10 flex items-center justify-center'>
          <img className='w-full h-auto' src={RegisterThumb} alt='Registrar em beedash' />
        </div>

      </div>
    </div>
  )
}