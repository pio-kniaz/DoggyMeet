import React, { useMemo } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import { useRefreshToken } from '@queries/auth/auth-queries';
import { useGetMe } from '@queries/users/users-queries';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { isApiError } from '@helpers/index';
import { unAuthRoutes } from '@/routes/unauthenticated-routes/UnAuthenticatedRoutes';
import { authRoutes } from '@/routes/authenticated-routes/AuthenticatedRoutes';
import { clearAccessToken, authSelector, setAccessToken, setUser } from '@/redux/auth/auth.slice';
import { PlaceHolder } from './Routes.styles';

function Router() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector(authSelector);

  const { isLoading } = useRefreshToken({
    onSuccess: (data) => {
      dispatch(setAccessToken({ accessToken: data.accessToken }));
    },
    onError: (error: unknown) => {
      dispatch(clearAccessToken());
      if (isApiError(error) && error.response?.data?.metaData?.message === 'jwt expired') {
        navigate('/', { replace: true });
      }
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

  const createRoutes = useMemo(() => {
    if (accessToken) {
      return authRoutes;
    }
    return unAuthRoutes;
  }, [accessToken]);

  const routes = useRoutes(createRoutes);

  if (isLoading || isGetMeLoading) {
    return <PlaceHolder data-testid="routes-placeholder" />;
  }

  return routes;
}

export default Router;
