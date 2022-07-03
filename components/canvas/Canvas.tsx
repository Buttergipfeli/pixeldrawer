import { NextPage } from 'next';
import { useState } from 'react';
import styles from './Canvas.module.css';

const Canvas: NextPage = () => {

    const [selected, setSelected] = useState<number[]>([]);
    const x: number[] = Array.from(Array(49).keys());
    const y: number[] = Array.from(Array(34).keys());

    return (
        <div className={styles.canvasBoard}>
            <div className={styles.canvas}>
                <div className={styles.canvasLayout}>
                    <div className={styles.canvasPixels}>
                        {y.map((numberY) =>
                            <div key={numberY} className={styles.tableRow}>
                                {x.map((numberX) =>
                                    <div
                                        key={numberX}
                                        className={styles.tableCell}
                                        style={(
                                            selected.length > 0 && selected[0] === numberX && selected[1] === numberY ?
                                                { backgroundColor: 'rgba(13, 169, 236, 0.5)' } :
                                                {}
                                        )}
                                        onClick={() => setSelected([numberX, numberY])}
                                    >
                                        <div className={styles.canvasPixel}></div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

export { Canvas };