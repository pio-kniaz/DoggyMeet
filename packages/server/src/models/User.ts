import mongoose, { Document, Model } from 'mongoose';
import { IUser } from '@interfaces/index';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: 'string',
      trim: true,
      required: true,
    },
    lastName: {
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
    passwordConfirm: {
      type: 'string',
      required: true,
    },
    terms: {
      type: 'boolean',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser & Document> = mongoose.model('User', userSchema);
