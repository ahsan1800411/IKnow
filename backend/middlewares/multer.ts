import fs from 'fs';
import multer from 'multer';
import path from 'path';
import CustomApiErrorHandler from '../utils/CustomApiErrorHandler';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    cb(null, path.join(__dirname, '../public'));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    if (
      extension !== '.jpeg' &&
      extension !== '.jpg' &&
      extension !== '.gif' &&
      extension !== '.png'
    ) {
      return cb(new CustomApiErrorHandler('Only videos are allowed!', 400));
    }
    cb(null, true);
  },
});
