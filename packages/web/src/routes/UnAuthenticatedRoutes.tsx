import React from 'react';
import { Routes, Route } from 'react-router-dom';

import BasicLayout from '@components/layouts/basic-layout/BasicLayout';
import HomePage from '@pages/home/HomePage';

const NotFoundPage = React.lazy(() => import('@pages/not-found/NotFoundPage'));

function UnAuthenticatedRoutes() {
  return (
    <div data-testid="unAuthenticatedRoutes">
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default UnAuthenticatedRoutes;
