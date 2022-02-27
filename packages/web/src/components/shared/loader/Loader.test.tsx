import React from 'react';
import { screen } from '@testing-library/react';

import Loader from '@components/shared/loader/Loader';
import { renderWithClient } from '@/utils/tests/createWrapper';

describe('Loader component tests', () => {
  it('Should render basic loader', () => {
    renderWithClient(<Loader />);
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveStyle({
      display: 'inline-block',
    });
  });
  it('Should render fullscreen loader', () => {
    renderWithClient(<Loader fullscreen />);
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveStyle({
      position: 'fixed',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      'z-index': '1000',
    });
  });
});
