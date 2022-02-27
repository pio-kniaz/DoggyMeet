import React, { useState, Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Loader } from '@components/shared';

const AuthenticatedRoutes = React.lazy(() => import('@routes/AuthenticatedRoutes'));
const UnAuthenticatedRoutes = React.lazy(() => import('@routes/UnAuthenticatedRoutes'));

function Routes() {
  const [isLogged] = useState(false);
  const routes = isLogged ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader fullscreen size="xl" />}>{routes}</Suspense>
    </BrowserRouter>
  );
}

export default Routes;
