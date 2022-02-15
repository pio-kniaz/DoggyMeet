import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@pages/home/HomePage';
import MainLayout from '@components/layouts/main-layout/MainLayout';

function AuthenticatedRoutes() {
  const withMainLayout = (Component: React.ComponentType<unknown>) => {
    return (
      <MainLayout>
        <Component />
      </MainLayout>
    );
  };
  return (
    <Routes>
      <Route path="/" element={withMainLayout(HomePage)} />
    </Routes>
  );
}

export default AuthenticatedRoutes;
