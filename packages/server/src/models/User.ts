import mongoose, { Document, Model } from 'mongoose';
import { IUser } from '@interfaces/index';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: 'string',
      trim: true,
      required: true,
    },
    email: {
      type: 'string',
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser & Document> = mongoose.model('User', userSchema);
