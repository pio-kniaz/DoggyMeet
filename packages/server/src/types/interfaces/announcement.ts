export interface IAnnouncement {
  _id: string;
  author: {
    id: string;
    name: string;
  };
  city: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'open' | 'close';
  updatedAt: string;
  createdAt: string;
}
