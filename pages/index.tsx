import { pixel } from '@prisma/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { Canvas } from '../components/canvas/Canvas';
import { ColorRegister } from '../components/colorregister/ColorRegister';
import { Download } from '../components/download/Download';
import { color, username } from '@prisma/client'
import { homeService } from '../service/home.service';
import styles from '../styles/Home.module.css';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { io, Socket } from 'socket.io-client';

type Props = {
  toolbar: string;
}

const Home: NextPage<Props> = ({ toolbar }) => {

  const [errorMessage, setErrorMessage] = useState('');
  const [pixels, setPixels] = useState<(pixel & { color: color, username: username })[]>([]);
  const colorPickerInput = useRef<Array<HTMLInputElement | null>>([]);
  const usernameInput = useRef<HTMLInputElement | null>(null);
  const buttonDisabled = useRef<HTMLButtonElement | null>(null);
  const selected = useRef(0);
  const [toolbarInfos, setToolbarInfos] = useState({ username: '', color: '' });
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    const asyncUseEffect = async () => {
      const responsePixels = await homeService.getAllPixels(setErrorMessage);
      if (responsePixels !== null) {
        homeService.socketInitializer(responsePixels, socket, setPixels, selected, setToolbarInfos);
      }
    }
    asyncUseEffect();
  }, []);

  useEffect(() => () => {
    if (socket.current) socket.current.disconnect();
  }, [])

  const drawPixel = async (): Promise<void> => {
    buttonDisabled.current !== null ? buttonDisabled.current.disabled = true : {};
    homeService.drawPixel(
      selected,
      colorPickerInput,
      usernameInput,
      setErrorMessage
    );
    buttonDisabled.current !== null ? buttonDisabled.current.disabled = false : {};
  }

  return (
    <div>
      <Head>
        <title>Pixeldrawer</title>
        <meta name="description" content="Real time pixel canvas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.contents}>
          {errorMessage &&
            <div className='errorMessage'>{errorMessage}</div>
          }
          <Canvas
            pixels={pixels}
            selectedRef={selected}
            toolbar={toolbar}
            toolbarInfos={toolbarInfos}
            setToolbarInfos={setToolbarInfos}
          />
          <ColorRegister
            drawPixel={drawPixel}
            buttonDisabled={buttonDisabled}
            colorPickerInput={colorPickerInput}
            usernameInput={usernameInput}
          />
          <Download
            setErrorMessage={setErrorMessage}
          />
        </div>
      </main>
    </div>
  );
}

export default Home
