import MainLayout from '@components/layouts/main-layout/MainLayout';
import { renderWithClient } from 'utils/tests/createWrapper';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockedUsedNavigate,
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('MainLayout test', () => {
  it('Should redirect to /announcement path when path is "/"', () => {
    renderWithClient(<MainLayout />, {
      path: '/',
    });
    expect(mockedUsedNavigate).toHaveBeenNthCalledWith(1, '/announcement', { replace: true });
  });
});
