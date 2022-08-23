import { MutableRefObject } from 'react';
import { GetImageFetch } from '../models/types/images';

export const imageService = {
    exportCanvasToImage,
    downloadImageBackup
}

const API_URL = '/api/images'
const headers = {
    'Content-Type': 'application/json'
}


async function exportCanvasToImage(): Promise<string | null> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers
    });

    const data: GetImageFetch = await response.json();
    if (!response.ok) {
        return data.message;
    }

    downLoadImage(data.image, 'canvas');
    return null;
}

async function downloadImageBackup(iId: number) {
    const response = await fetch(API_URL + '/' + iId, {
        method: 'GET',
        headers: headers
    });

    const data: GetImageFetch = await response.json();
    if (!response.ok) {
        return data.message;
    }

    downLoadImage(data.image, 'canvas-backup');
    return null;
}

function downLoadImage(image: string, fileName: string) {
    const fakeLink = window.document.createElement("a");
    fakeLink.setAttribute('style', 'display: none;');
    fakeLink.download = fileName;

    fakeLink.href = 'data:image/jpeg;base64,' + image;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
}