import React from 'react';
import {render, screen} from '@testing-library/react';
import HomePage from '@pages/home/HomePage';

describe('HomePage tests', () => {
  it('Should render home page title', () => {
    render(<HomePage />);
    const title = screen.getByRole('heading', {name: /home page/i});
    expect(title).toBeInTheDocument();
  });
});
