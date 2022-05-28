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
  status: 'open' | 'closed';
  updatedAt: string;
  createdAt: string;
}
