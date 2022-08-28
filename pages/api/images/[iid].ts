import { NextApiRequest, NextApiResponse } from "next";
import { createCanvasImagePuppeteer, getImageByIId } from "../../../beservice/image.service";
import { getAllPixels } from "../../../beservice/pixels.service";
import { onlyNumber } from "../../../constants/regex/regex";
import { GetImageApi } from "../../../models/types/images";
import * as fs from 'fs';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetImageApi>
) {

    if (req.method === 'GET') {
        const { iid } = req.query;

        if (!onlyNumber.test(iid as string)) {
            return res.status(406).json({ message: 'Your pathvariable must be a number!' });
        }
        const numberIId = parseInt(iid as string);

        try {
            if (numberIId === 0) {
                const pixels = await getAllPixels();
                const imageHtml = await createCanvasImagePuppeteer(pixels);

                return res.status(200).json({ image: imageHtml.toString('base64'), message: 'Image created' });
            } else {
                const gettedImageByIId = await getImageByIId(numberIId);

                if (gettedImageByIId === null) {
                    return res.status(404).json({ message: 'Image couldn\'t be found!' });
                }

                const gettedImageByIIdPath = './public/images/canvasbackups/' + gettedImageByIId.image_name + '/' + gettedImageByIId.image_name + '.png';
                if (!fs.existsSync(gettedImageByIIdPath)) {
                    return res.status(404).json({ message: 'Couldn\'t find the image you\'re searching for!' });
                }
                const bitmapImage = fs.readFileSync(gettedImageByIIdPath);
                const base64Image = Buffer.from(bitmapImage).toString('base64');

                return res.status(200).json({ image: base64Image, message: 'Image downloaded' });
            }
        } catch {
            return res.status(500).json({ message: 'Unexpected error happened while downloading image' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}