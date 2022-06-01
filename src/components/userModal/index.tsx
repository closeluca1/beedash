import { useHeaderService } from '../../contexts/header';
import { getAuth, signOut } from 'firebase/auth';
import { AiOutlineClose, AiOutlineUser, AiOutlineCode, AiOutlineSetting, AiOutlineAliwangwang, AiOutlineNumber } from 'react-icons/ai';

import 'dotenv';

interface ClassProps {
  visibility: string;
}

export function UserModal({ visibility }: ClassProps) {

  const { setModalVisible } = useHeaderService();
  const auth = getAuth();

  return (
    <div className={`animate-appearModal rounded-md w-60 fixed top-16 -ml-44 bg-zinc-50 shadow-sm z-40 ${visibility}`}>

      <div className='w-full flex justify-end px-5 mt-5'>
        <AiOutlineClose className='w-4 h-4 mr-3 text-red-600 rounded-full border-red-600 cursor-pointer' onClick={() => setModalVisible()} />
      </div>

      <a href={import.meta.env.VITE_HOME}>
        <div className='w-full py-3 px-5 cursor-pointer transition-all duration-150 flex flex-row items-center hover:bg-zinc-100'>
          <AiOutlineNumber className='w-4 h-4 mr-3 text-indigo-900 rounded-full' />
          <span className='text-indigo-900 text-sm font-semibold'>Explorar</span>
        </div>
      </a>

      <a href={import.meta.env.VITE_USER_DASHBOARD}>
        <div className='w-full py-3 px-5 cursor-pointer transition-all duration-150 flex flex-row items-center hover:bg-zinc-100'>
          <AiOutlineUser className='w-4 h-4 mr-3 text-indigo-900 rounded-full border-indigo-900 border' />
          <span className='text-indigo-900 text-sm font-semibold'>Perfil</span>
        </div>
      </a>

      <a href="">
        <div className='w-full py-3 px-5 cursor-pointer transition-all duration-150 flex flex-row items-center hover:bg-zinc-100'>
          <AiOutlineCode className='w-4 h-4 mr-3 text-indigo-900 rounded-full border-indigo-900' />
          <span className='text-indigo-900 text-sm font-semibold'>Buzz</span>
        </div>
      </a>

      <a href={import.meta.env.VITE_USER_CONFIG}>
        <div className='w-full py-3 px-5 cursor-pointer transition-all duration-150 flex flex-row items-center hover:bg-zinc-100'>
          <AiOutlineSetting className='w-4 h-4 mr-3 text-indigo-900 rounded-full border-indigo-900' />
          <span className='text-indigo-900 text-sm font-semibold'>Configurações</span>
        </div>
      </a>

      <div className='w-full flex justify-end px-5 my-3 border-t-2'>
        <span className='text-indigo-900 hover:text-emerald-500 cursor-pointer text-sm font-semibold mt-2' onClick={() => signOut(auth)}>Desconectar</span>
      </div>

    </div>
  )
}