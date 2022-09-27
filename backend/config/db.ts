import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect('mongodb://localhost:27017/speak-app')
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));
};
