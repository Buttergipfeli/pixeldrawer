import { color, pixel, username } from '@prisma/client';
import { NextPage } from 'next';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './Canvas.module.css';
import { canvasService } from './service/canvas.service';

type Props = {
    pixels: (pixel & { color: color, username: username })[];
    selected: number;
    setSelected: Dispatch<SetStateAction<number>>;
    toolbar: string;
    username: string;
    color: string;
}

const Canvas: NextPage<Props> = ({ pixels, selected, setSelected, toolbar, username, color }) => {

    const convertedPixels = canvasService.convertPixels(pixels);
    const y: number[] = Array.from(Array(34).keys());
    const [toolbarInfos, setToolbarInfos] = useState({ username: '', color: '' });

    return (
        <div className={styles.canvasBoard}>
            <div className={styles.canvas}>
                <div className={styles.canvasLayout}>
                    {toolbar !== '' &&
                        <div className={styles.toolbar} style={{ alignItems: (toolbarInfos.username !== '' ? 'center' : '') }}>
                            {toolbarInfos.username !== ''
                                ?
                                <div className={styles.toolbarText}>
                                    <span>Username: {toolbarInfos.username}</span>
                                    <span>Color: {toolbarInfos.color}</span>
                                </div>
                                :
                                (selected === 0
                                    ?
                                    <span>Nothing selected!</span>
                                    :
                                    <span>Empty field!</span>
                                )
                            }
                        </div>
                    }
                    <div className={styles.canvasPixels}>
                        {!convertedPixels.loading &&
                            y.map((index) =>
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
                                            onClick={() => canvasService.selectedHandler(pX, setSelected, setToolbarInfos)}
                                        >
                                            <div className={styles.canvasPixel}>
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