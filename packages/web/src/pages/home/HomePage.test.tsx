import React from 'react';
import HomePage from '@pages/home/HomePage';
import { screen } from '@testing-library/react';
import { renderWithClient } from '@/utils/tests/createWrapper';

describe('HomePage tests', () => {
  it('Should render main title', () => {
    renderWithClient(<HomePage />);
    const title = screen.getByRole('heading', {
      name: /tworz wspaniala psia społeczność i pomagaj sobie wzajemnie\./i,
    });
    expect(title).toBeInTheDocument();
  });
});
