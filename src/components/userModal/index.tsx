import { useHeaderService } from '../../contexts/header';

interface ClassProps {
  visibility: string;
}

export function UserModal ({ visibility }: ClassProps) {
  
  const {setModalVisible} = useHeaderService();
  
  return (
    <div className={`animate-appearModal rounded-md w-60 absolute top-16 -ml-44 bg-pink-400 z-40 ${visibility}`}>
      <span onClick={() => setModalVisible()}>close</span>

      <br/>
      user modal
    </div>
  )
}