import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
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

userSchema.statics.setPassword = async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const User: Model<IUser & Document> = mongoose.model('User', userSchema);
