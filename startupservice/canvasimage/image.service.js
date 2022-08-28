const canvasHtmlService = require('./canvashtml.service');
const puppeteer = require('puppeteer');
const prismaClientInstance = require('../../constants/prisma/prisma');
const fs = require('fs');

async function createCanvasImageBackup(pixels) {

    const todayDir = createCurrentDateFolderIfNotExists();
    try {
        await prismaClientInstance.$transaction(async () => {
            const allImagesCount = await prismaClientInstance.image.count({});
            let allImages = await prismaClientInstance.image.findMany({});

            if (allImagesCount >= 5) {

                const lastImage = await prismaClientInstance.image.findFirst({
                    where: {
                        image_number: 1
                    }
                });

                if (lastImage !== null) {
                    const lastImagePath = './public/images/canvasbackups/' + lastImage.image_name;
                    if (fs.existsSync(lastImagePath)) {
                        fs.rmSync(lastImagePath, { recursive: true });
                    }
                }

                await prismaClientInstance.image.delete({
                    where: {
                        image_number: 1
                    }
                });

                allImages.shift();
                for (let i = 0; i < allImages.length; i++) {
                    await prismaClientInstance.image.update({
                        where: {
                            image_number: i + 2
                        },
                        data: {
                            image_number: i + 1
                        }
                    });
                }
            }

            if (allImagesCount <= 5) {
                await prismaClientInstance.image.create({
                    data: {
                        image_number: (allImagesCount === 5 ? allImagesCount : allImagesCount + 1),
                        image_name: todayDir.todayString
                    }
                });
            }

            const browser = await puppeteer.launch({
                defaultViewport: { width: 1030, height: 743 },
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            });
            const page = await browser.newPage();

            await page.setContent(canvasHtmlService.canvasInHtml(pixels));

            const imageBuffer = await page.screenshot({ omitBackground: true });

            await page.close();
            await browser.close();

            fs.writeFileSync(todayDir.dir + '/' + todayDir.todayString + '.png', imageBuffer.toString('base64'), 'base64');
        });
    } catch (e) {
        console.log(e);
        if (fs.existsSync(todayDir.dir)) {
            fs.rmSync(todayDir.dir, { recursive: true });
        }
    }
}

function createCurrentDateFolderIfNotExists() {
    const currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, '0');
    let currentMonth = currentDate.getMonth();
    if (currentMonth === 12) {
        currentMonth = 1;
    } else {
        currentMonth = currentMonth + 1;
    }
    const mm = String(currentMonth).padStart(2, '0');
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