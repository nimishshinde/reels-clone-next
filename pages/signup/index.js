import React from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import insta from "../../assets/insta.png";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from 'next/router'; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';




function Index() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState(null);

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { signup, user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");

      const user = await signup(email, password);
      console.log("Signed Up", user);


      const storageRef = ref(storage, `${user.user.uid}/Profile`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          console.log("above getDownloadURL")
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            let obj = {
              name : name,
              email : email,
              uid : user.user.uid,
              photoURL : downloadURL,
              posts:[]
            }
            console.log("OBJ = ",user);
            console.log("uid --------> ", user.user.uid);
            await setDoc(doc(db, "users", user.user.uid), obj);
          });

        }
      );
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(()=>{
    if(user){
      router.push('/login');
    }
  }, [user])

  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          <Image src={insta} alt='image' />

          <TextField
            size="small"
            id="outlined-basic"
            label="Email"
            fullWidth
            margin="dense"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            size="small"
            id="outlined-basic"
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            size="small"
            id="outlined-basic"
            label="Full Name"
            fullWidth
            margin="dense"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            fullWidth
            component="label"
            style={{ marginTop: "0.8rem" }}
            variant="outlined"
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            Upload
          </Button>

          <Button
            fullWidth
            component="label"
            style={{ marginTop: "0.8rem" }}
            variant="contained"
            onClick={handleClick}
          >
            Sign Up
          </Button>

          <div className="bottom-card">
            Already Hava an Account ?
            <Link href="/login">
              <span style={{ color: "blue", cursor: "pointer" }}>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
