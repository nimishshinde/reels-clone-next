import React from 'react'
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import {v4 as uuidv4} from 'uuid';
import {  serverTimestamp, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, getDownloadURL ,downloadURL, uploadBytesResumable } from 'firebase/storage' 

function Upload({userData}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const file = e.target.files[0];  
    
    if(file == null){
      setError('No File Selected');
      setTimeout(()=>{
        setError('');
      }, 3000)
      return;
    }
    if((file.size / (1024*1024)) > 40){
      setError("Please Select a File Smaller than 30Mb");
      setTimeout(()=>{
        setError('');
      }, 3000)
      return;
    }

    let uid = uuidv4();
    setLoading(true);
    
    const storageRef = ref(storage, `${userData.uid}/posts/${uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
          console.log("Upload is " + prog + "% done");
        },
        (error) => {
          setError(error.message);
            setTimeout(()=>{
            setError('');
          }, 3000)
          return;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            let obj = {
              likes: [],
              postId : uid,
              postUrl : downloadURL,
              profileName : userData.name,
              profileUrl : userData.photoURL,
              uid : userData.uid,
              timestamp : serverTimestamp()
            }

            await setDoc(doc(db, "posts", uid), obj);
            await updateDoc(doc(db, "users", userData.uid),{
              posts : arrayUnion(uid)
            })

            console.log("doc added");
          });

        }
      );
  }

  return (
    <div className="upload-btn">
      {
        error == '' ?
        <Button startIcon={<MovieIcon />} fullWidth component="label" style={{marginTop:'0.8rem'}} variant="outlined">
          <input type="file" accept="video/*" style={{display: 'none'}} onChange={handleChange} />
          Upload
        </Button> : 
        <Alert severity="error">{error}</Alert>
      }
      {
        loading && 
        <LinearProgress className='progress-bar' variant="determinate" value={progress} />
      }
    </div>
  )
}

export default Upload