import Jimp from 'jimp';

export const resizeImage = async (
  buffer: Buffer,
  height: number,
): Promise<string> => {
  const image = await Jimp.read(buffer);
  const src = await image
    .scaleToFit(height, Jimp.AUTO, Jimp.RESIZE_BEZIER)
    .quality(100)
    .getBase64Async(Jimp.MIME_JPEG);

  return src;
};
