import { describe, expect, it } from 'vitest';
import { calculateTotal, formatPrice, validateEmail } from './helpers';

describe('helpers', () => {
  it('formats prices using USD currency', () => {
    expect(formatPrice(29.99)).toBe('$29.99');
  });

  it('calculates the total for a list of items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5.5, quantity: 3 },
    ];

    expect(calculateTotal(items)).toBe(10 * 2 + 5.5 * 3);
  });

  it('validates emails with a simple regex', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('user@localhost')).toBe(false);
  });
});
