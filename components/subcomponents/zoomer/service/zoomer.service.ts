import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { contentInsideParentheses } from '../../../../constants/regex/regex';

export const zoomerService = {
    zoomIn,
    zoomOut
}

function zoomIn(zoomProps: number, setZoomProps: Dispatch<SetStateAction<number>>) {
    if (zoomProps < 2) {
        setZoomProps(zoomProps + 0.1);
    }
}

function zoomOut(zoomProps: number, setZoomProps: Dispatch<SetStateAction<number>>) {
    if (zoomProps > 0.3) {
        setZoomProps(zoomProps - 0.1);
    }
}