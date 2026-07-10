import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the welcome heading and call to action text', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /welcome to the the daily harvest/i })).toBeInTheDocument();
    expect(screen.getByText(/check out our products page/i)).toBeInTheDocument();
  });
});
