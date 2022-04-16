import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '@pages/home/HomePage';
import NotFoundPage from '@pages/not-found/NotFoundPage';
import BasicLayout from '@components/layouts/basic-layout/BasicLayout';

function UnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default UnAuthenticatedRoutes;
