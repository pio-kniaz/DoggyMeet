import React from 'react';

import { screen, fireEvent, waitFor } from '@testing-library/react';
import Modal from '@components/modal/Modal';
import { renderWithClient } from '@/utils/tests/createWrapper';

describe('Modal component test', () => {
  it('Should render SIGN UP modal', () => {
    renderWithClient(<Modal />, {
      preloadedState: {
        modal: {
          modalType: 'SIGN_UP',
          modalProps: {},
        },
      },
    });
    const signupModal = screen.getByTestId('signup-modal');
    expect(signupModal).toBeInTheDocument();
  });

  it('Should render SIGN IN modal', () => {
    renderWithClient(<Modal />, {
      preloadedState: {
        modal: {
          modalType: 'SIGN_IN',
          modalProps: {},
        },
      },
    });
    const signinModal = screen.getByTestId('signin-modal');
    expect(signinModal).toBeInTheDocument();
  });
  it('Should render close button and after click modal should be closed', async () => {
    renderWithClient(<Modal />, {
      preloadedState: {
        modal: {
          modalType: 'SIGN_UP',
          modalProps: {},
        },
      },
    });
    const signupModal = screen.getByTestId('signup-modal');
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(signupModal).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(signupModal).not.toBeInTheDocument();
    });
  });
});
