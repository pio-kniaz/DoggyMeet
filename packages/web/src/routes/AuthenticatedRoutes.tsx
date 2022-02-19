import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
      <Route
        path="/"
        element={withMainLayout(() => (
          <p>sds</p>
        ))}
      />
    </Routes>
  );
}

export default AuthenticatedRoutes;
