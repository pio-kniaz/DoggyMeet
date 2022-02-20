import React from 'react';
import { screen } from '@testing-library/react';

import Footer from '@components/layouts/footer/Footer';
import { renderWithClient } from '@/utils/tests/createWrapper';

describe('Footer tests', () => {
  it('Should render Footer component', () => {
    renderWithClient(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('Should render Footer info', () => {
    renderWithClient(<Footer />);
    const text = screen.getByText(`© Copyright ${new Date().getFullYear()} NO NAME APP. All rights reserved.`);
    expect(text).toBeInTheDocument();
  });
});
