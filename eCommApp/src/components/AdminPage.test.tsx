import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AdminPage from './AdminPage';

describe('AdminPage', () => {
  it('applies a sale percentage and allows resetting it', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/set sale percent/i);
    await user.clear(input);
    await user.type(input, '15');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/all products are 15% off/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /end sale/i }));

    expect(screen.getByText(/no sale active/i)).toBeInTheDocument();
  });

  it('shows an error for invalid sale input', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/set sale percent/i);
    await user.clear(input);
    await user.type(input, 'abc');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
  });
});
