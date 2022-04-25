import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRefreshToken } from '@queries/auth/auth-queries';
import { useGetMe } from '@queries/users/users-queries';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { Loader } from '@components/shared';
import { clearAccessToken, authSelector, setAccessToken, setUser } from '@/redux/auth/auth.slice';

const AuthenticatedRoutes = React.lazy(() => import('@routes/AuthenticatedRoutes'));
const UnAuthenticatedRoutes = React.lazy(() => import('@routes/UnAuthenticatedRoutes'));

function Routes() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector(authSelector);

  const { isLoading } = useRefreshToken({
    onSuccess: (data) => {
      dispatch(setAccessToken({ accessToken: data.accessToken }));
    },
    onError: () => {
      dispatch(clearAccessToken());
      navigate('/', { replace: true });
    },
  });

  const { isLoading: isGetMeLoading } = useGetMe({
    enabled: !!accessToken,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
    },
    onError: () => {
      dispatch(clearAccessToken());
      navigate('/', { replace: true });
    },
  });

  // TODO: Content visibility hidden;
  if (isLoading || isGetMeLoading) {
    return <Loader fullscreen size="xl" />;
  }

  return (
    <>
      <Suspense fallback={<Loader fullscreen size="xl" />}>
        {!accessToken ? <UnAuthenticatedRoutes /> : <AuthenticatedRoutes />}
      </Suspense>
    </>
  );
}

export default Routes;
