import '../styles/globals.css'
import Navbar from '../components/Navbar/Navbar'
import {CountryProvider} from "../context/CountryContext"

function MyApp({ Component, pageProps }) {
  return( 
  <>
  <CountryProvider>
    <Navbar />
    <Component {...pageProps} />
  </CountryProvider>
  </>)
}

export default MyApp
