import React, { FormEvent, SetStateAction, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { Input } from '../../../components/input';
import { Button } from '../../../components/button';

import { createDataUserService } from '../../../contexts/register';

import RegisterThumb from '../../../assets/register_thumb.svg';

import { useEffect } from 'react';

export function Register() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState<boolean>(false);

  const [createEmail, setCreateEmail] = useState('');
  const [createPass, setCreatePass] = useState('');

  const { getUserToken, setDocUser, docUser, firsName, lastName, setFirsName, setLastName } = createDataUserService();

  const [seePass, setSeePass] = useState<boolean>(false)
  const [typePass, setTypePass] = useState<string>('password');

  const [getUser, setGetUser] = useState<string>();

  function watchPass() {
    if (seePass === false) {
      setTypePass('password');
    } else if (seePass === true) {
      setTypePass('text');
    }
  }

  useEffect(() => {
    watchPass();
  })

  async function createAccount(e: any) {
    e.preventDefault();
    setAuthing(true);

    // try {
    //   await console.log(
    //     firsName,
    //     lastName,
    //     createEmail,
    //     createPass,
    //     docUser
    //   )
    // } catch (error) {
    //   console.log(error)
    // }

    await createUserWithEmailAndPassword(auth, createEmail, createPass).then((response) => {
      console.log('response',response)
      // // const validate = { docUser: response.user.uid }
      // const validateUser = setDocUser(response.user.uid);
      // console.log('validate user',validateUser)
      // try {
      //     getUserToken(validateUser)

      //     console.log('doc user', validateUser)
      //     console.log(getUserToken(validateUser))

      // } catch (error) {
      //   console.log(error)
      // }

      // console.log('doc user', docUser)
      setDocUser(response.user.uid)      
      console.log('uid', response.user.uid)
        
    }).catch((error) => {
      console.log(error);
      setAuthing(false);
    })
    
    console.log('docuser', docUser);
    getUserToken(docUser);
    
    setTimeout(() => {
      navigate(import.meta.env.VITE_HOME);
    }, 500);

  };


  return (
    <div className='mt-10 md:mt-0 w-full min-h-[90vh] flex justify-center items-center px-5'>
      <div className='w-full md:max-w-5xl flex row flex-wrap'>
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
                  pattern='.{8,}'
                  title='Sua senha não pode ser fraca'
                  onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setCreatePass(event.target.value)}
                />
                <span className='ml-4 pt-3 cursor-pointer' onClick={() => setSeePass(!seePass)}>

                  {seePass ? <AiOutlineEye className='w-5 h-5' /> : <AiOutlineEyeInvisible className='w-5 h-5' />}

                </span>
              </div>

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