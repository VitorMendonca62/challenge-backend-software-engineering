import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: false },
  status: {
    type: String,
    enum: ['pendente', 'realizando', 'concluida'],
    required: true,
  },
  expiresOn: { type: Date, required: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});
