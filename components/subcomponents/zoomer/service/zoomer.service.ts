import { MutableRefObject } from "react";
import { contentInsideParentheses } from '../../../../constants/regex/regex';

export const zoomerService = {
    zoomIn,
    zoomOut
}

function zoomIn(zoomProps: MutableRefObject<HTMLDivElement | null>) {
    if (zoomProps.current !== null) {
        const currentTransform = zoomProps.current.style.transform;
        let currentZoomValueArr: RegExpExecArray | null;
        let currentZoomValue: number;
        if (currentTransform !== '') {
            currentZoomValueArr = contentInsideParentheses.exec(currentTransform);
            if (currentZoomValueArr === null || currentZoomValueArr.length <= 0) {
                return;
            }
            currentZoomValue = parseFloat(currentZoomValueArr[1]);
            if (currentZoomValue >= 2) {
                return;
            }
            zoomProps.current.style.transform = `scale(${currentZoomValue + 0.1})`
        } else {
            zoomProps.current.style.transform = 'scale(1.1)'
        }
    }
}

function zoomOut(zoomProps: MutableRefObject<HTMLDivElement | null>) {
    if (zoomProps.current !== null) {
        const currentTransform = zoomProps.current.style.transform;
        let currentZoomValueArr: RegExpExecArray | null;
        let currentZoomValue: number;
        if (currentTransform !== '') {
            currentZoomValueArr = contentInsideParentheses.exec(currentTransform);
            if (currentZoomValueArr === null || currentZoomValueArr.length <= 0) {
                return;
            }
            currentZoomValue = parseFloat(currentZoomValueArr[1]);
            if (currentZoomValue <= 0.3) {
                return;
            }
            zoomProps.current.style.transform = `scale(${currentZoomValue - 0.1})`
        } else {
            zoomProps.current.style.transform = 'scale(0.9)'
        }
    }
}