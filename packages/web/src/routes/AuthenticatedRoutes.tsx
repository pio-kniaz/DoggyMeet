import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '@components/layouts/main-layout/MainLayout';
import UsersPage from '@pages/users/UsersPage';
import NotFoundPage from '@pages/not-found/NotFoundPage';

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<UsersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AuthenticatedRoutes;
