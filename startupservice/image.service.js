const nodeHtmlToImage = require("node-html-to-image");
const canvasHtmlService = require('./canvashtml.service');
const fs = require('fs');

async function createCanvasImageBackup(pixels) {
    const todayDir = createCurrentDateFolderIfNotExists();

    return await nodeHtmlToImage({
        type: "jpeg",
        quality: 100,
        output: todayDir.dir + '/' + todayDir.todayString + '.jpeg',
        html: canvasHtmlService.canvasInHtml(pixels)
    });
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