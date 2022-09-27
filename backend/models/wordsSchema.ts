import mongoose from 'mongoose';

const wordsSchema = new mongoose.Schema({
  vocabulary: {
    type: String,
    required: true,
  },

  sentences: [],
  pictureUrl: [],
});

export default mongoose.model('Word', wordsSchema);
