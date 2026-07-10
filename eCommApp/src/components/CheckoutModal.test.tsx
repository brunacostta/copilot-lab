import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
  it('renders the confirmation copy and calls callbacks when buttons are clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    render(<CheckoutModal onConfirm={onConfirm} onCancel={onCancel} />);

    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(screen.getByText(/do you want to proceed with the checkout/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /continue checkout/i }));
    await user.click(screen.getByRole('button', { name: /return to cart/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
