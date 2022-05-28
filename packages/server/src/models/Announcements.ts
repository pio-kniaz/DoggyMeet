import type { IAnnouncement } from '@interfaces/index';

import mongoose, { Schema, Model } from 'mongoose';

type IAnnouncementModel = Model<IAnnouncement>;

const announcementSchema = new Schema<IAnnouncement, IAnnouncementModel>(
  {
    author: {
      id: {
        type: 'string',
        trim: true,
        required: true,
      },
      name: {
        type: 'string',
        trim: true,
        required: true,
      },
    },
    city: {
      type: 'string',
      trim: true,
      required: true,
    },
    description: {
      type: 'string',
      trim: true,
      required: true,
    },
    coordinates: {
      lat: {
        type: 'number',
        required: true,
      },
      lng: {
        type: 'number',
        required: true,
      },
    },
    status: {
      type: 'string',
      required: true,
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

export const Announcement = mongoose.model<IAnnouncement, IAnnouncementModel>(
  'Announcement',
  announcementSchema
);
