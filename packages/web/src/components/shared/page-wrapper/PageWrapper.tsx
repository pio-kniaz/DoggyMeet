import React from 'react';
import styled from '@emotion/styled';

interface IPageWrapper {
  children: React.ReactNode;
}

const EmotionPageWrapper = styled.section`
  background: transparent;
`;

function PageWrapper({ children }: IPageWrapper) {
  return <EmotionPageWrapper>{children}</EmotionPageWrapper>;
}

export default PageWrapper;
