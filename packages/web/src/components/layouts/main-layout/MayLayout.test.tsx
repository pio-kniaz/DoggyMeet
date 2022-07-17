import MainLayout from '@components/layouts/main-layout/MainLayout';
import { renderWithClient } from 'utils/tests/createWrapper';
import { screen } from '@testing-library/react';

describe('MainLayout component tests', () => {
  it('Should render the main layout', () => {
    renderWithClient(<MainLayout />);
    const mainLayout = screen.getByTestId('mainLayout');
    expect(mainLayout).toBeInTheDocument();
  });
});
