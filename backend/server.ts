import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import wordsRoutes from './routes/wordRoutes';

const app = express();
var corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/words', wordsRoutes);
app.use(errorHandler);

connectDB();

app.listen(8000, () => console.log(`Server is listening on port ${8000}`));
