/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unreachable */
import React, { useState, Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Loader } from '@components/shared';

const AuthenticatedRoutes = React.lazy(() => import('@routes/AuthenticatedRoutes'));
const UnAuthenticatedRoutes = React.lazy(() => import('@routes/UnAuthenticatedRoutes'));

function Routes() {
  // eslint-disable-next-line no-unused-vars
  const [isLogged, setIsLogged] = useState(false);
  const routes = isLogged ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader fullscreen size="xl" />}>{routes}</Suspense>
    </BrowserRouter>
  );
}

export default Routes;
