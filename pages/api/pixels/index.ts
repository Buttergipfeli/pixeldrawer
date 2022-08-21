import type { NextApiRequest, NextApiResponse } from 'next';
import type { PixelsApi } from '../../../models/types/pixels';
import { getAllPixels } from '../../../beservice/pixels.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PixelsApi>
) {
  if (req.method === 'POST') {
  } else if (req.method === 'GET') {
    try {
      const pixels = await getAllPixels();
      return res.status(200).json({ message: 'Got all pixels', pixels: pixels });
    } catch {
      return res.status(500).json({ message: 'Error while getting all pixels!' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}




// For creating pixels.
/*
  if (req.method === 'DELETE') {
    const username: Prisma.usernameCreateInput = { username: '' }
    await prismaClientInstance.username.create({
      data: username
    });

    const color: Prisma.colorCreateInput = { color: '#FFFFFF' }
    await prismaClientInstance.color.create({
      data: color
    });

    const pixel: Prisma.pixelCreateInput = { username: { connect: { id: 1 } }, color: { connect: { id: 1 } } }
    for (let i = 0; i < 1666; i++) {
      await prismaClientInstance.pixel.create({
        data: pixel
      });
    }
    return res.status(200).json({ message: 'Created Pixels' });
  }
*/