import { useEffect, useState } from 'react';
import { db } from '../../../App';
import { addDoc, collection, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function UserConfig() {


  const auth = getAuth();
  const [feedbacks, setFeedbacks] = useState<any[]>([]);


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user && user.uid) {
        console.log(user.uid)



        const refTest = collection(db, 'users', user.uid, 'user');

        // const docSnap = await getDoc(refTest);





        const getFeedback = () => {
          return getDocs(refTest)
        }

        async function getFeedbacks() {
          const data: any = await getFeedback();

          // setFeedbacks(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));

          // console.log(data.doc)
          console.log(data.docs)
          console.log(data.docs.map((doc: any) => ({...doc.data()})))
        }
        getFeedbacks();

      }
      else (
        console.log('no')
      )
    });

  })



  return (
    <div className='w-full flex justify-center'>
      <div className='w-full flex justify-between items-center rounded-sm max-w-3xl p-5 mt-20 bg-zinc-50'>

        {feedbacks}

      </div>
    </div>
  )
}