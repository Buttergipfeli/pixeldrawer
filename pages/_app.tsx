import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavbarContent } from '../components/navbarcontent/NavbarContent'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const [toolbar, setToolbar] = useState<string>('');

  useEffect(() => {
    setToolbar(localStorage.getItem('pixeldrawer-toolbar') ?? '');
  }, [])

  return (
    <div>
      <NavbarContent toolbar={toolbar} setToolbar={setToolbar}></NavbarContent>
      <div className='container'>
        <Component {...pageProps} toolbar={toolbar} />
      </div>
    </div >
  );
}

export default MyApp;