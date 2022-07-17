import type { IAnnouncement } from 'shared';

import mongoose, { Schema, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

type IAnnouncementModel = PaginateModel<IAnnouncement>;

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
announcementSchema.plugin(mongoosePaginate);
export const Announcement = mongoose.model<IAnnouncement, IAnnouncementModel>(
  'Announcement',
  announcementSchema
);
