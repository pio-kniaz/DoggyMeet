import React from 'react';

import BasicLayout from '@components/layouts/basic-layout/BasicLayout';
import HomePage from '@pages/home/HomePage';

const NotFoundPage = React.lazy(() => import('@pages/not-found/NotFoundPage'));

export const unAuthRoutes = [
  {
    element: (
      <div data-testid="routes-unAuthenticated">
        <BasicLayout />
      </div>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
