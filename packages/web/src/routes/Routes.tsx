import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRefreshToken } from '@queries/auth/auth-queries';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { Loader } from '@components/shared';
import { logout, authSelector, setUser } from '@/redux/auth/auth.slice';

const AuthenticatedRoutes = React.lazy(() => import('@routes/AuthenticatedRoutes'));
const UnAuthenticatedRoutes = React.lazy(() => import('@routes/UnAuthenticatedRoutes'));

function Routes() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutateAsync } = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAppSelector(authSelector);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { accessToken: accessTokenResp } = await mutateAsync();
        dispatch(setUser({ accessToken: accessTokenResp }));
      } catch (error) {
        dispatch(logout());
        navigate('/', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    if (!accessToken) {
      checkToken();
    } else {
      setIsLoading(false);
    }
  }, [accessToken, dispatch, mutateAsync, navigate]);

  if (isLoading) {
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
