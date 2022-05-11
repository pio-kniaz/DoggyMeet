import React from 'react';

import MainLayout from '@components/layouts/main-layout/MainLayout';

const AnnouncementPage = React.lazy(() => import('@pages/announcement/AnnouncementPage'));
const NotFoundPage = React.lazy(() => import('@pages/not-found/NotFoundPage'));

export const authRoutes = [
  {
    path: '/',
    element: (
      <div data-testid="routes-authenticated">
        <MainLayout />
      </div>
    ),
    children: [
      {
        index: true,
        element: <AnnouncementPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
