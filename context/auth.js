import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged, signOut   } from 'firebase/auth';
import { sendPasswordResetEmail,  createUserWithEmailAndPassword } from 'firebase/auth';


export const AuthContext = React.createContext()

function AuthWrapper({children}) {

  const [user, setUser] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout(){
    return signOut(auth);
  }

  function forgot(email){
    return sendPasswordResetEmail(auth, email);
  }

  function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const store = {
    login,
    user,
    logout,
    forgot,
    signup
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
      }else{
        setUser('');
      }
    })
    setLoading(false);
  },[])

  return (
    <AuthContext.Provider value={store} >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper