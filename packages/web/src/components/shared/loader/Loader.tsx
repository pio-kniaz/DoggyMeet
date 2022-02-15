import React from 'react';
import { Spinner, SpinnerProps } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface ILoader extends SpinnerProps {
  fullscreen?: boolean;
}

const LoaderWrapper = styled('div')<ILoader>((props) => {
  if (props.fullscreen) {
    return {
      position: 'fixed',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      'z-index': '1000',
    };
  }
  return {
    display: 'inline-block',
  };
});

function Loader({ fullscreen = false, color = 'green.500', ...spinnerProps }: ILoader) {
  return (
    <LoaderWrapper fullscreen={fullscreen}>
      <Spinner color={color} {...spinnerProps} />
    </LoaderWrapper>
  );
}

export default Loader;
