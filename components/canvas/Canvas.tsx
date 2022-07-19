import { pixel } from '@prisma/client';
import { NextPage } from 'next';
import { useState } from 'react';
import styles from './Canvas.module.css';
import { canvasService } from './service/canvas.service';

type Props = {
    pixels: pixel[]
}

const Canvas: NextPage<Props> = ({ pixels }) => {

    const [selected, setSelected] = useState<number>(0);
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
                                                    {}
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