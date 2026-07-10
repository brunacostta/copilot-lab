import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CartContext, CartProvider } from './CartContext';
import { Product } from '../types';

const product: Product = {
  id: '1',
  name: 'Apple',
  price: 1.99,
  reviews: [],
  inStock: true,
};

const Consumer = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Missing cart context');
  }

  return (
    <div>
      <p data-testid="count">{context.cartItems.length}</p>
      <p data-testid="quantity">{context.cartItems[0]?.quantity ?? 0}</p>
      <button onClick={() => context.addToCart(product)}>Add Item</button>
      <button onClick={() => context.clearCart()}>Clear Cart</button>
      <p>{context.cartItems[0]?.name ?? 'empty'}</p>
    </div>
  );
};

describe('CartContext', () => {
  it('adds items to the cart and clears them', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <Consumer />
      </CartProvider>
    );

    expect(screen.getByTestId('count')).toHaveTextContent('0');

    await user.click(screen.getByRole('button', { name: /add item/i }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByText('Apple')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /clear cart/i }));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByText('empty')).toBeInTheDocument();
  });

  it('increments the quantity when the same product is added again', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <Consumer />
      </CartProvider>
    );

    await user.click(screen.getByRole('button', { name: /add item/i }));
    await user.click(screen.getByRole('button', { name: /add item/i }));

    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('quantity')).toHaveTextContent('2');
  });
});
