import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAppSelector } from '@hooks/useRedux';
import { Loader } from '@components/shared';
import { authSelector } from '@/redux/auth/auth.slice';
import withPersistUser from '@/hoc/withPeristUserr';

const AuthenticatedRoutes = React.lazy(() => import('@routes/AuthenticatedRoutes'));
const UnAuthenticatedRoutes = React.lazy(() => import('@routes/UnAuthenticatedRoutes'));

function Routes() {
  const authState = useAppSelector(authSelector);
  const routes = authState?.accessToken ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader fullscreen size="xl" />}>{routes}</Suspense>
    </BrowserRouter>
  );
}

export default withPersistUser(Routes);
