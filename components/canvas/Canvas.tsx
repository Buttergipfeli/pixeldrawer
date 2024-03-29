import { color, pixel, username } from '@prisma/client';
import { NextPage } from 'next';
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react';
import { Toolbar } from '../subcomponents/toolbar/Toolbar';
import { Zoomer } from '../subcomponents/zoomer/Zoomer';
import styles from './Canvas.module.css';
import { canvasService } from './service/canvas.service';

type Props = {
    pixels: (pixel & { color: color, username: username })[];
    selectedRef: MutableRefObject<number>;
    toolbar: string;
    toolbarInfos: { username: string; color: string; };
    setToolbarInfos: Dispatch<SetStateAction<{ username: string; color: string; }>>;
}

const Canvas: NextPage<Props> = ({ pixels, selectedRef, toolbar, toolbarInfos, setToolbarInfos }) => {

    const [selected, setSelected] = useState(0);
    const [zoomProps, setZoomProps] = useState(1.0);
    const hoverCanvas = useRef(false);

    const convertedPixels = canvasService.convertPixels(pixels);
    const y: number[] = Array.from(Array(34).keys());

    // transform: scale(0.5);

    const selectedHandler = () => {
        selectedRef.current = 0;
        setSelected(0);
        setToolbarInfos({ username: '', color: '' });
    }

    return (
        <div className={styles.canvasBoard}>
            <div className={styles.canvas}>
                {toolbar !== '' &&
                    <>
                        <Toolbar toolbarInfos={toolbarInfos} selected={selected} />
                        <Zoomer zoomProps={zoomProps} setZoomProps={setZoomProps} />
                    </>
                }
                <div
                    className={styles.canvasLayout}
                    onClick={() => (!hoverCanvas.current ? selectedHandler() : {})}
                >
                    <div
                        className={styles.canvasPixels}
                        style={zoomProps >= 1 ?
                            {
                                width: `${986 * zoomProps}px`,
                                height: `${700 * zoomProps}px`
                            } :
                            {
                                width: '986px',
                                height: '700px',
                                transform: `scale(${zoomProps})`
                            }
                        }
                        onMouseOver={() => hoverCanvas.current = true}
                        onMouseOut={() => hoverCanvas.current = false}
                    >
                        {!convertedPixels.loading &&
                            y.map((index) =>
                                <div key={index} className={styles.tableRow}>
                                    {convertedPixels.pixelX[index].map((pX) =>
                                        <div
                                            key={pX.id}
                                            className={styles.tableCell}
                                            style={(
                                                selected > 0 && selected === pX.id ?
                                                    {
                                                        backgroundImage: `linear-gradient(rgba(13, 169, 236, 0.5), rgba(13, 169, 236, 0.5)), linear-gradient(${pX.color.color}, ${pX.color.color})`,
                                                        boxShadow: '2px 0 0 0 #88f876, 0 2px 0 0 #88f876, 2px 2px 0 0 #88f876, 2px 0 0 0 #88f876 inset, 0 2px 0 0 #88f876 inset'
                                                    } :
                                                    {
                                                        backgroundColor: pX.color.color,
                                                        backgroundImage: 'none',
                                                        boxShadow: '2px 0 0 0 #88f876, 0 2px 0 0 #88f876, 2px 2px 0 0 #88f876, 2px 0 0 0 #88f876 inset, 0 2px 0 0 #88f876 inset'
                                                    }
                                            )}
                                            onClick={() => canvasService.selectedHandler(pX, setSelected, selectedRef, setToolbarInfos)}
                                        >
                                            <div className={styles.canvasPixel} style={zoomProps >= 1 ?
                                                {
                                                    width: `${20 * zoomProps}px`,
                                                    height: `${20 * zoomProps}px`
                                                } :
                                                {
                                                    width: '20px',
                                                    height: '20px'
                                                }
                                            }>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export { Canvas };