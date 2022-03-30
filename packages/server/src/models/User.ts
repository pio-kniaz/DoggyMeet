import type { IUser } from '@interfaces/index';
import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { errorCodeName } from '@const/index';
import { ErrorException } from '@/utils/error-handler/error-exception';

interface IUserModel extends Model<IUser> {
  setPassword(password: string): Promise<string>;
  findByCredentials({
    password,
    email,
  }: {
    password: string;
    email: string;
  }): Promise<
    IUser &
      mongoose.Document & {
        _id: string;
      }
  >;
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
    refreshToken: String,
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
userSchema.statics.findByCredentials = async function hashPassword({
  email,
  password,
}) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new ErrorException(errorCodeName.ClientError, 'User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorException(errorCodeName.Forbidden, 'Password not correct');
  }
  return user;
};

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
