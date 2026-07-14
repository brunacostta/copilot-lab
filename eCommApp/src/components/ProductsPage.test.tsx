import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProductsPage from './ProductsPage';
import { CartContext } from '../context/CartContext';
import { Product, Review } from '../types';

vi.mock('./Header', () => ({ default: () => <div>Header</div> }));
vi.mock('./Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('./ReviewModal', () => ({
  default: ({ product, onSubmit }: { product: Product | null; onSubmit: (review: Review) => void }) =>
    product ? (
      <div>
        <div data-testid="review-modal">Review Modal</div>
        <button onClick={() => onSubmit({ author: 'Jane', comment: 'Lovely product', date: '2024-01-01' })}>Submit Review</button>
      </div>
    ) : null,
}));

describe('ProductsPage', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    mockFetch.mockReset();
    vi.stubGlobal('fetch', mockFetch);
  });

  const renderProductsPage = (addToCart = vi.fn()) => {
    return render(
      <CartContext.Provider value={{ cartItems: [], addToCart, removeFromCart: vi.fn(), clearCart: vi.fn() }}>
        <ProductsPage />
      </CartContext.Provider>
    );
  };

  it('loads products and adds one to the cart', async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();

    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          id: 'apple',
          name: 'Apple',
          price: 1.5,
          description: 'Fresh apple',
          image: 'apple.jpg',
          reviews: [],
          inStock: true,
        }),
      } as Response)
    );

    renderProductsPage(addToCart);

    await waitFor(() => expect(screen.getAllByText('Apple').length).toBeGreaterThan(0));
    const addToCartButtons = screen.getAllByRole('button', { name: /add to cart/i });
    await user.click(addToCartButtons[0]);

    expect(addToCart).toHaveBeenCalledWith(expect.objectContaining({ name: 'Apple' }));
  });

  it('shows a loading message while products are being fetched', () => {
    mockFetch.mockImplementation(() => new Promise<Response>(() => undefined));

    renderProductsPage();

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it('handles fetch failures without crashing', async () => {
    mockFetch.mockRejectedValue(new Error('Failed to load'));

    renderProductsPage();

    await waitFor(() => expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument());
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('submits a review for the selected product', async () => {
    const user = userEvent.setup();

    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          id: 'apple',
          name: 'Apple',
          price: 1.5,
          description: 'Fresh apple',
          image: 'apple.jpg',
          reviews: [],
          inStock: true,
        }),
      } as Response)
    );

    renderProductsPage();

    await waitFor(() => expect(screen.getAllByText('Apple').length).toBeGreaterThan(0));
    const productImages = screen.getAllByAltText('Apple');
    await user.click(productImages[0]);
    await user.click(screen.getByRole('button', { name: /submit review/i }));

    expect(screen.getByTestId('review-modal')).toBeInTheDocument();
  });
});
