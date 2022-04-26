import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useRefreshToken } from '@queries/auth/auth-queries';
import { useGetMe } from '@queries/users/users-queries';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import AuthenticatedRoutes from '@routes/AuthenticatedRoutes';
import UnAuthenticatedRoutes from '@routes/UnAuthenticatedRoutes';
import { clearAccessToken, authSelector, setAccessToken, setUser } from '@/redux/auth/auth.slice';
import { PlaceHolder } from './Routes.styles';

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

  if (isLoading || isGetMeLoading) {
    return <PlaceHolder data-testid="routes-placeholder" />;
  }

  return <>{!accessToken ? <UnAuthenticatedRoutes /> : <AuthenticatedRoutes />}</>;
}

export default Routes;
