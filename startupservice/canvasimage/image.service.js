const nodeHtmlToImage = require("node-html-to-image");
const canvasHtmlService = require('./canvashtml.service');
const prismaClientInstance = require('../../constants/prisma/prisma');
const fs = require('fs');

async function createCanvasImageBackup(pixels) {

    const todayDir = createCurrentDateFolderIfNotExists();
    try {
        await prismaClientInstance.$transaction(async () => {
            const allImagesCount = await prismaClientInstance.image.count({});
            const allImages = await prismaClientInstance.image.findMany({});

            if (allImagesCount >= 5) {
                await prismaClientInstance.image.delete({
                    where: {
                        image_number: 1
                    }
                });

                await Promise.all(allImages.map(async (image, index) => {
                    await prismaClientInstance.image.update({
                        where: {
                            image_number: index + 2
                        },
                        data: {
                            image_number: index + 1
                        }
                    })
                }));
            }

            if (allImagesCount < 5) {
                await prismaClientInstance.image.create({
                    data: { image_number: allImagesCount + 1, image_name: todayDir.todayString }
                });
            }

            await nodeHtmlToImage({
                type: "jpeg",
                quality: 100,
                output: todayDir.dir + '/' + todayDir.todayString + '.jpeg',
                html: canvasHtmlService.canvasInHtml(pixels)
            });
        });
    } catch {
        if (fs.existsSync(todayDir.dir)) {
            fs.rmSync(todayDir.dir, { recursive: true });
        }
    }
}

function createCurrentDateFolderIfNotExists() {
    const currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth()).padStart(2, '0');
    const yyyy = currentDate.getFullYear()

    const todayString = dd + mm + yyyy;
    var todayDir = './public/images/canvasbackups/' + todayString;

    if (!fs.existsSync(todayDir)) {
        fs.mkdirSync(todayDir);
    }

    return { dir: todayDir, todayString: todayString };

}

module.exports = {
    createCanvasImageBackup
}