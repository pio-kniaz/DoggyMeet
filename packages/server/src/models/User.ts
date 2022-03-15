import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '@interfaces/index';

interface IUserModel extends Model<IUser> {
  setPassword(password: string): Promise<string>;
}

const { Schema } = mongoose;

const userSchema = new Schema<IUser, IUserModel>(
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

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
