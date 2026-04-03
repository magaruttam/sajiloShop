import multer from 'multer';

// Memory storage: file is available as req.file.buffer (no disk saving)
export const upload = multer({ storage: multer.memoryStorage() });