import React from 'react';
// import { Navigate } from 'react-router-dom';
import MainLayout from '@components/layouts/main-layout/MainLayout';

const AnnouncementPage = React.lazy(() => import('@pages/announcement/AnnouncementPage'));
const AnnouncementListing = React.lazy(() => import('@pages/announcement/announcement-listing/AnnouncementListing'));
const AnnouncementNew = React.lazy(() => import('@/pages/announcement/announcement-new/AnnouncementNew'));
const NotFoundPage = React.lazy(() => import('@pages/not-found/NotFoundPage'));

export const authRoutes = [
  {
    element: (
      <div data-testid="routes-authenticated">
        <MainLayout />
      </div>
    ),
    children: [
      // { path: '/', element: <Navigate to="/announcement" /> },
      {
        path: 'announcement',
        element: <AnnouncementPage />,
        children: [
          {
            index: true,
            element: <AnnouncementListing />,
          },
          {
            path: 'new',
            element: <AnnouncementNew />,
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
