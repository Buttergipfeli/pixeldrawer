import styles from './Zoomer.module.css';
import { NextPage } from "next";
import { MutableRefObject } from 'react';
import { zoomerService } from './service/zoomer.service';

type Props = {
    zoomProps: MutableRefObject<HTMLDivElement | null>
}

const Zoomer: NextPage<Props> = ({ zoomProps }) => {
    return (
        <div className={styles.zoomer}>
            <div className={styles.plus} onClick={() => zoomerService.zoomIn(zoomProps)}>
                <svg width="265" height="265" viewBox="0 0 265 265" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="132" y1="251.14" x2="132" y2="13" stroke="black" strokeWidth="26" strokeLinecap="square" />
                    <line x1="13" y1="132" x2="251.14" y2="132" stroke="black" strokeWidth="26" strokeLinecap="square" />
                </svg>
            </div>
            <div className={styles.minus} onClick={() => zoomerService.zoomOut(zoomProps)}>
                <svg width="265" height="26" viewBox="0 0 265 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="13" y1="13" x2="251.14" y2="13" stroke="black" strokeWidth="26" strokeLinecap="square" />
                </svg>
            </div>
        </div>
    )
}

export { Zoomer };