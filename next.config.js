/** @type {import('next').NextConfig} */
const cron = require('node-cron');
const pixelsService = require('./startupservice/pixels.service');
const imageService = require('./startupservice/image.service');

cron.schedule('0 0 * * 0', async function () {
  const pixels = await pixelsService.getAllPixels();
  await imageService.createCanvasImageBackup(pixels);
});


const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
