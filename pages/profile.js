import React from 'react'
import ProfileComp from '../components/profileComp'
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/router';


function Profile() {

  const  { user } = useContext(AuthContext);
  
  const Redirect = () =>{
    const router = useRouter();
    router.push('/login');
    return null;
  }

  return (
    <>
      <div>
          {
            user?.uid ? <ProfileComp/> : <Redirect/>  
          }
      </div>
    </>
  )
}

export default Profile