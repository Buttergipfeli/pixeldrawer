import { NextPage } from 'next';
import styles from './Canvas.module.css';

const Canvas: NextPage = () => {

    const x: number[] = Array.from(Array(49).keys());
    const y: number[] = Array.from(Array(34).keys());

    return (
        <div className={styles.canvasBoard}>
            <div className={styles.canvas}>
                <div className={styles.canvasLayout}>
                    <div className={styles.canvasPixels}>
                        {y.map((number) =>
                            <div key={number} className={styles.tableRow}>
                                {x.map((number) =>
                                    <div key={number} className={styles.tableCell}>
                                        <div className={styles.canvasPixel}></div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Canvas };