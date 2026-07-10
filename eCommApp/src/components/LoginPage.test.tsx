import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('navigates to the admin page for valid admin credentials', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/username/i), 'admin');
    await user.type(screen.getByPlaceholderText(/password/i), 'admin');
    await user.click(screen.getByRole('button', { name: /^login$/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/admin');
    expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
  });

  it('shows an error for invalid credentials', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/username/i), 'wrong');
    await user.type(screen.getByPlaceholderText(/password/i), 'wrong');
    await user.click(screen.getByRole('button', { name: /^login$/i }));

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
