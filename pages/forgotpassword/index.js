import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import insta from "../../assets/insta.png";
import Button from "@mui/material/Button";
import { Carousel } from 'react-responsive-carousel';
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import { AuthContext } from "../../context/auth";
import { useContext } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';


function Index() {

  const router = useRouter(); // conditional routing or programatic redirect 
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { login, user, forgot } = useContext(AuthContext);

  const handleClick = async() => {
    try{
      setLoading(true);
      setError('');
      await forgot(email);
      console.log("Email Send");
      router.push('/login');
    }catch(err){
      setError(err.message);
      console.log(err.message);
      setTimeout(()=>{
        setError('');
      }, 3000)      
    }
    setLoading(false);
  }

  // useEffect(()=>{
  //   if(user){
  //     router.push('/');
  //   }
  // }, [user])


  return (
    <>
      <div className="login-container">
        <div className="carbg">
          <div className="car">
            <Carousel showIndicators={false} showThumbs={false}
            infiniteLoop={true} autoPlay={true} interval={2000} showArrows={false}>
              <Image src={bg1} alt="image" ></Image>
              <Image src={bg2} alt="image" ></Image>
              <Image src={bg3} alt="image" ></Image>
              <Image src={bg4} alt="image" ></Image>
            </Carousel>
          </div>
        </div>

        <div className="login-card">
          <Image src={insta} alt='image'/>

          <TextField
            size="small"
            id="outlined-basic"
            label="Email"
            fullWidth
            margin="dense"
            variant="outlined"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
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
            onChange={(e)=> setPassword(e.target.value)}
          />
          
          {
            error != '' && 
            <div style={{ color: "red" }}>{error}</div>
          }

          <Button
            fullWidth
            component="label"
            style={{ marginTop: "0.8rem" }}
            variant="outlined"
            onClick={handleClick}
            disabled={loading}
          >
            Send Email
          </Button>
          
          <div className="bottom-card">
            Dont Have an Account ?{" "}
            <Link href='/signup' passHref={true} >
              <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;