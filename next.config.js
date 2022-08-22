/** @type {import('next').NextConfig} */
const cron = require('node-cron');
const pixelsService = require('./startupservice/canvasimage/pixels.service');
const imageService = require('./startupservice/canvasimage/image.service');

// * * * * * --> Every minute
// 0 0 * * 0 --> Every week
cron.schedule('0 0 * * 0', async function () {
  const pixels = await pixelsService.getAllPixels();
  await imageService.createCanvasImageBackup(pixels);
});


const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
