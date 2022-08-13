import { color, pixel } from '@prisma/client';
import { NextPage } from 'next';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './Canvas.module.css';
import { canvasService } from './service/canvas.service';

type Props = {
    pixels: (pixel & { color: color; })[];
    selected: number;
    setSelected: Dispatch<SetStateAction<number>>
}

const Canvas: NextPage<Props> = ({ pixels, selected, setSelected }) => {

    console.log(pixels); // --> fix too much updates
    const convertedPixels = canvasService.convertPixels(pixels);
    const y: number[] = Array.from(Array(34).keys());

    return (
        <div className={styles.canvasBoard}>
            <div className={styles.canvas}>
                <div className={styles.canvasLayout}>
                    <div className={styles.canvasPixels}>
                        {!convertedPixels.loading &&
                            y.map((pCY, index) =>
                                <div key={index} className={styles.tableRow}>
                                    {convertedPixels.pixelX[index].map((pX) =>
                                        <div
                                            key={pX.id}
                                            className={styles.tableCell}
                                            style={(
                                                selected > 0 && selected === pX.id ?
                                                    { backgroundColor: 'rgba(13, 169, 236, 0.5)' } :
                                                    { backgroundColor: pX.color.color }
                                            )}
                                            onClick={() => setSelected(pX.id)}
                                        >
                                            <div className={styles.canvasPixel}></div>
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