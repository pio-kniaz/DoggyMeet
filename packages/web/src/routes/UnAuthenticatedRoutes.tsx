import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '@pages/main/MainPage';
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
      <Route path="/" element={withBasicLayout(MainPage)} />
      <Route path="/about" element={withBasicLayout(MainPage)} />
    </Routes>
  );
}

export default UnAuthenticatedRoutes;
