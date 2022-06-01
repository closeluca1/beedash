import { useEffect } from 'react';
import { useHeaderService } from '../../contexts/header';
import { UserModal } from '../userModal';

import { VerifyLogin } from '../../contexts/auth';

import 'dotenv'

export function Header() {

  const { modalVisible, handleModal } = useHeaderService();

  const { userName } = VerifyLogin();


  return (
    <div className='w-full flex justify-center py-3 shadow-sm bg-zinc-50 fixed top-0 left-0'>
      <div className='w-full flex justify-between items-center max-w-3xl px-5'>

        <h1>bee<i>dash</i></h1>

        <nav className='flex row items-center justify-end w-3/4'>
          <a href={import.meta.env.VITE_USER_DASHBOARD}><span className='mr-5'>{userName}</span></a>

          <img onClick={handleModal} className='rounded-full w-8 h-8 border-2 border-indigo-900 cursor-pointer' src="https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg" alt="" />

          <UserModal
            visibility={!modalVisible ? 'hidden' : 'visible'}
          />
        </nav>
      </div>
    </div>
  )
}