import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/navbar/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar></Navbar>
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </div >
  );
}

export default MyApp
