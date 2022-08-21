import { NextApiRequest, NextApiResponse } from "next";
import { createCanvasImage } from "../../../beservice/image.service";
import { getAllPixels } from "../../../beservice/pixels.service";
import { GetImageApi } from "../../../models/types/images";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetImageApi>
) {

    if (req.method === 'GET') {
        try {
            const pixels = await getAllPixels();

            const imageHtml = await createCanvasImage(pixels);
            return res.status(200).json({ image: imageHtml.toString('base64'), message: 'Image created' });
        } catch {
            return res.status(200).json({ message: 'Unexpected error happened while downloading image' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}