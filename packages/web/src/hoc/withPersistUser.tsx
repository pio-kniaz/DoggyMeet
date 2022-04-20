import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '@components/shared';
import { useRefreshToken } from '@queries/auth/auth-queries';
import { useAppDispatch } from '@hooks/useRedux';
import { setUser } from '@/redux/auth/auth.slice';

function withPersistUser<P>(WrappedComponent: React.ComponentType<P>) {
  return function ComponentWithPersistUser(props: P) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { mutateAsync, isLoading, isIdle } = useRefreshToken();
    useEffect(() => {
      const getUser = async () => {
        try {
          const { accessToken } = await mutateAsync();
          dispatch(setUser({ accessToken }));
        } catch (error) {
          // dispatch(logout());
          navigate('/', { replace: true });
        }
      };
      getUser();
    }, [dispatch, mutateAsync, navigate]);
    if (isIdle || isLoading) {
      return <Loader fullscreen size="xl" />;
    }
    return <WrappedComponent {...props} />;
  };
}

export default withPersistUser;
