import express from 'express';
import {
  createWord,
  getAllWords,
  saveFileAsMp3,
} from '../controllers/wordsController';
import { upload } from '../middlewares/multer';

const router = express.Router();

router
  .route('/')
  .get(getAllWords)
  .post(
    upload.fields([
      {
        name: 'images',
        maxCount: 3,
      },
    ]),
    createWord
  );
router.route('/save').post(saveFileAsMp3);

export default router;
