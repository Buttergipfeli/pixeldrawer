import type { NextApiRequest, NextApiResponse } from 'next';
import type { PixelsPathApi, PixelsApiBody } from '../../../models/types/pixels';
import { prismaClientInstance } from '../../../constants/prisma/prisma';
import { onlyNumber } from '../../../constants/regex/regex';
import { Prisma, username } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PixelsPathApi>
) {

    if (req.method === 'PUT') {
        const { pid } = req.query;
        if (!onlyNumber.test(pid as string)) {
            return res.status(406).json({ message: 'Your pathvariable must be a number!' });
        }
        const numberPid = parseInt(pid as string);
        const pixelsBody: PixelsApiBody = req.body;
        try {
            const response = await prismaClientInstance.$transaction(async () => {
                let searchUserName = await prismaClientInstance.username.findFirst({
                    where: { username: pixelsBody.username.username }
                });
                if (searchUserName === null) {
                    searchUserName = await prismaClientInstance.username.create({
                        data: pixelsBody.username
                    });
                }

                let searchColor = await prismaClientInstance.color.findFirst({
                    where: { color: pixelsBody.color.color }
                })
                if (searchColor === null) {
                    searchColor = await prismaClientInstance.color.create({
                        data: pixelsBody.color
                    });
                }

                const updatePixel = await prismaClientInstance.pixel.update({
                    where: { id: numberPid },
                    data: {
                        username: { connect: { id: searchUserName.id } },
                        color: { connect: { id: searchColor.id } }
                    },
                    include: { color: true }
                });

                return { username: searchUserName, color: searchColor, pixel: updatePixel }
            });

            return res.status(200).json({ message: 'Pixel got updated and drawn', pixel: response.pixel });
        } catch {
            return res.status(500).json({ message: 'Unexpected error happened. Maybe the id of the pixel doesn\'t exist.' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

// For creating pixels.
/*
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
*/