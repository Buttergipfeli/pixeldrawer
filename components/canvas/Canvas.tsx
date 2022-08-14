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
    toolbarInfos: { username: string; color: string; };
    setToolbarInfos: Dispatch<SetStateAction<{ username: string; color: string; }>>;
}

const Canvas: NextPage<Props> = ({ pixels, selected, setSelected, toolbar, toolbarInfos, setToolbarInfos }) => {

    const convertedPixels = canvasService.convertPixels(pixels);
    const y: number[] = Array.from(Array(34).keys());
    let hoverCanvas = false;

    return (
        <div className={styles.canvasBoard}>
            <div className={styles.canvas}>
                <div
                    className={styles.canvasLayout}
                    onClick={() => (!hoverCanvas ? setSelected(0) : {})}
                >
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
                    <div
                        className={styles.canvasPixels}
                        onMouseOver={() => hoverCanvas = true}
                        onMouseOut={() => hoverCanvas = false}
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
                                                    { backgroundImage: `linear-gradient(rgba(13, 169, 236, 0.5), rgba(13, 169, 236, 0.5)), linear-gradient(${pX.color.color}, ${pX.color.color})` } :
                                                    { backgroundColor: pX.color.color, backgroundImage: 'none' }
                                            )}
                                            onClick={() => canvasService.selectedHandler(pX, setSelected, setToolbarInfos)}
                                        >
                                            <div className={styles.canvasPixel} style={{}}>
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