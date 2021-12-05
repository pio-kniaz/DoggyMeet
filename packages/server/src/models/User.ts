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

userSchema.post('save', (error: any, _doc: Document, next: unknown) => {
  if (typeof next === 'function') {
    if (error?.code === 11000 && error?.keyValue?.email) {
      next(new Error('email must be unique'));
    } else {
      next(error);
    }
  }
});
export const User: Model<IUser & Document> = mongoose.model('User', userSchema);
