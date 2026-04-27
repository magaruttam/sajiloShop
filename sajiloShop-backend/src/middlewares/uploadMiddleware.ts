import multer from "multer";

// Memory storage: file is available as req.file.buffer (no disk saving)
export const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
  },
});
