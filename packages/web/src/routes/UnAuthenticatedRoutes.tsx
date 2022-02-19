import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@pages/home/HomePage';
import NotFoundPage from '@pages/not-found/NotFoundPage';
import BasicLayout from '@components/layouts/basic-layout/BasicLayout';

function UnAuthenticatedRoutes() {
  const withBasicLayout = (Component: React.ComponentType<unknown>) => {
    return (
      <BasicLayout>
        <Component />
      </BasicLayout>
    );
  };
  return (
    <Routes>
      <Route path="/" element={withBasicLayout(HomePage)} />
      <Route path="*" element={withBasicLayout(NotFoundPage)} />
    </Routes>
  );
}

export default UnAuthenticatedRoutes;
