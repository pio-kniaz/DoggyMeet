import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '@components/layouts/main-layout/MainLayout';

const AnnouncementPage = React.lazy(() => import('@pages/announcement/AnnouncementPage'));
const NotFoundPage = React.lazy(() => import('@pages/not-found/NotFoundPage'));

function AuthenticatedRoutes() {
  return (
    <div data-testid="authenticatedRoutes">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AnnouncementPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AuthenticatedRoutes;
