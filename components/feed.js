import React, { useState, useContext, useEffect } from 'react'
import Navbar from './navbar';
import Upload from './upload';
import Post from '../components/post';
import { AuthContext } from '../context/auth';;
import {onSnapshot, doc, query, orderBy, collection} from 'firebase/firestore';
import { db } from '../firebase';

function Feed() {

  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    console.log(user.uid);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{
      console.log(doc.data());
      setUserData(doc.data());
    })

    return () => {
      unsub();
    }
  }, [user])

  useEffect(()=>{
    const unsub = onSnapshot(query(collection(db, "posts"),
    orderBy("timestamp", "desc")), (snapshot) =>{
      let tempArray = []
      snapshot.docs.map((doc) =>{
        tempArray.push(doc.data()) 
      })
      setPosts([...tempArray])
      console.log(tempArray + "Post Array")
    })
    return () => {
      unsub();
    }
  }, [])



  return (
    <div className='feed-container'>
      <Navbar userData={userData} />
      <Upload userData={userData}/>

      <div className="video-container">
        {
          posts.map((post) => (
            <Post  key={post.postId} postData={post} userData={userData}  />
          ))
        }
      </div>

    </div>
  )
}

export default Feed;