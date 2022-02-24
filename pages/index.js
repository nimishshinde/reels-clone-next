import Head from 'next/head'
import Feed from "../components/feed.js";
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';

export default function Home() {
  
  const  { user } = useContext(AuthContext);
  
  const Redirect = () =>{
    const router = useRouter();
    router.push('/login');
    return null;
  }
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        user ?.uid ? <Feed /> : <Redirect/> 
      }
      
    </div>
  )
}
