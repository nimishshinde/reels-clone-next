import '../styles/globals.css'
import './signup.css';
import './login.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "../components/feed.css";
import AuthWrapper from '../context/auth';
import "../components/profileComp.css";



function MyApp({ Component, pageProps }) {

  return(
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  )
}

export default MyApp
