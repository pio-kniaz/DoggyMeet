import React, { useMemo } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import { useRefreshToken } from '@queries/auth/auth-queries';
import { useGetMe } from '@queries/users/users-queries';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { authRoutes } from '@routes/AuthenticatedRoutes';
import { unAuthRoutes } from '@routes/UnAuthenticatedRoutes';
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
    onError: () => {
      dispatch(clearAccessToken());
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
