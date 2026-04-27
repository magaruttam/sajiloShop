import ImageKit, { toFile } from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * Upload a file buffer to ImageKit
 * @param buffer  - req.file.buffer from Multer memory storage
 * @param fileName - original file name (req.file.originalname)
 * @param folder  - destination folder in ImageKit e.g. "/products"
 */
export const uploadToImageKit = async (
  buffer: Buffer,
  fileName: string,
  folder: string = "/",
) => {
  try {
    const response = await imagekit.files.upload({
      file: await toFile(buffer, fileName),
      fileName: fileName,
      folder: folder,
    });
    return response; // contains response.url — the live image URL
  } catch (err) {
    throw err;
  }
};

/**
 * Upload multiple file buffers to ImageKit
 * @param files - Array of { buffer, originalname } from Multer
 * @param folder - destination folder in ImageKit e.g. "/products"
 */
export const uploadMultipleToImageKit = async (
  files: { buffer: Buffer; originalname: string }[],
  folder: string = "/",
) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const response = await imagekit.files.upload({
        file: await toFile(file.buffer, file.originalname),
        fileName: file.originalname,
        folder: folder,
      });
      return response.url!;
    });

    const urls = await Promise.all(uploadPromises);
    return urls; // Array of image URLs
  } catch (err) {
    throw err;
  }
};

export default imagekit;
