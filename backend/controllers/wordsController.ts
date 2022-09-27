import { Request, Response } from 'express';
import Word from '../models/wordsSchema';
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gtts from 'gtts';

export const getAllWords = async (req: Request, res: Response) => {
  const words = await Word.find();

  res.status(200).json({
    words,
  });
};

export const createWord = async (req: Request, res: Response) => {
  const { vocabulary, sentences } = req.body;

  const images = (req as any).files.images;

  const word = await Word.create({
    vocabulary,
    sentences,
    pictureUrl: [
      images[0].originalname,
      images[1] && images[1].originalname,
      images[2] && images[2].originalname,
    ],
  });
  return res.status(200).json({
    word,
  });
};

export const saveFileAsMp3 = async (req: Request, res: Response) => {
  const { text } = req.body;

  let language = 'en-us';

  let outputFilePath = Date.now() + 'output.mp3';

  var voice = new gtts(text, language);

  voice.save(outputFilePath, function (err: any, result: any) {
    if (err) {
      fs.unlinkSync(outputFilePath);
      res.send('Unable to convert to audio');
    }
    res.download(outputFilePath, (err) => {
      if (err) {
        fs.unlinkSync(outputFilePath);
        res.send('Unable to download the file');
      }

      fs.unlinkSync(outputFilePath);
    });
  });
};
