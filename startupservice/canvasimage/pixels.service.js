const prismaClientInstance = require('../../constants/prisma/prisma');

async function getAllPixels() {
    return await prismaClientInstance.pixel.findMany({
        include: { color: true, username: true }
    });
}

module.exports = {
    getAllPixels
}