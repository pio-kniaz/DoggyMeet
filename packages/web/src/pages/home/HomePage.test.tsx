import React from 'react';
import HomePage from '@pages/home/HomePage';
import { screen, within, fireEvent } from '@testing-library/react';
import { renderWithClient } from '@/utils/tests/createWrapper';
import * as modalSlice from '@/redux/modal/modal.slice';

const spyOpenModal = jest.spyOn(modalSlice, 'openModal');

describe('HomePage tests', () => {
  it('Should render main title', () => {
    renderWithClient(<HomePage />);
    const title = screen.getByRole('heading', {
      name: /Create a great canine community and help each other.\./i,
    });
    expect(title).toBeInTheDocument();
  });
  it('Should render list of info on page', () => {
    renderWithClient(<HomePage />);
    const list = screen.getByRole('list', {
      name: 'info-list',
    });
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent('Add information about the need for a walk for your dog.');
    expect(items[1]).toHaveTextContent('Help others by taking someone&apos;s dog for a walk.');
  });
  it('Should render join to us button on page', () => {
    renderWithClient(<HomePage />);
    const button = screen.getByRole('button', { name: /join us!/i });
    expect(button).toBeInTheDocument();
  });
  it('Should open sign up modal after button click', async () => {
    renderWithClient(<HomePage />);
    const button = screen.getByRole('button', { name: /join us!/i });
    fireEvent.click(button);
    expect(spyOpenModal).toBeCalledWith({
      modalType: modalSlice.ModalTypes.SIGN_UP,
    });
  });
});
