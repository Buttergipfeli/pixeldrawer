import type { NextPage } from 'next';
import Head from 'next/head';
import { Canvas } from '../components/canvas/Canvas';
import { ColorRegister } from '../components/colorregister/ColorRegister';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Pixeldrawer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.contents}>
          <Canvas></Canvas>
          <ColorRegister></ColorRegister>
        </div>
      </main>
    </div>
  );
}

export default Home