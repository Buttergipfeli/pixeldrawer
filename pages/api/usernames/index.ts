import type { NextApiRequest, NextApiResponse } from 'next';
import type { PixelsApi } from '../../../models/types/pixels';
import { prismaClientInstance } from '../../../constants/prisma/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PixelsApi>
) {
    return res.status(405).json({ message: 'Method not allowed' });
}