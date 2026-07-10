import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ReviewModal from './ReviewModal';
import { Product } from '../types';

const product: Product = {
  id: '1',
  name: 'Apple',
  price: 1.99,
  reviews: [{ author: 'Jane', comment: 'Great', date: '2024-01-01' }],
  inStock: true,
};

describe('ReviewModal', () => {
  it('renders nothing when no product is provided', () => {
    const { container } = render(<ReviewModal product={null} onClose={() => {}} onSubmit={() => {}} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('submits a review and resets the form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ReviewModal product={product} onClose={() => {}} onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText(/your name/i), 'John');
    await user.type(screen.getByPlaceholderText(/your review/i), 'Lovely product');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ author: 'John', comment: 'Lovely product' }));
  });
});
