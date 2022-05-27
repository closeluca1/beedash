import { useHeaderService } from '../../contexts/header';
import { VerifyLogin } from '../../contexts/auth';
import { UserModal } from '../userModal';

export function Header() {

  const { modalVisible, handleModal } = useHeaderService();
  const { login } = VerifyLogin();


  return (
    <>
    {login && (
      <div className='w-full flex justify-center py-3 shadow-sm bg-zinc-50 fixed top-0 left-0'>
        <div className='w-full flex justify-between items-center max-w-4xl px-5'>

          <h1>beedasgh</h1>

          <nav className=''>
            <img onClick={handleModal} className='rounded-full w-8 h-8 border-2 border-indigo-900  cursor-pointer' src="https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg" alt="" />

            <UserModal
              visibility={!modalVisible ? 'hidden' : 'visible'}
            />
          </nav>
        </div>
      </div>

    )}
  </>
  )
}