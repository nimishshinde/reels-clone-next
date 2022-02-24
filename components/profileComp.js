import React from 'react'
import Navbar from '../components/navbar';
import Image from 'next/image';
import ProImg from '../assets/pro-img.jpg';

function ProfileComp() {
  return (
    <>
        <Navbar />
        <div>
          <div className="profile-upper">
            <Image src={ProImg} className='pro-img' alt='image' />  
            
            <div style={{flexBasis:'40%'}} >
              <h2>Name : Nimish Shinde<div>Post : 0</div></h2>    
            </div>

          </div>

          <div className='profile-lower'>

          </div>

        </div>
    </>
  )
}

export default ProfileComp