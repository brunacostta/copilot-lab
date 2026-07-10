import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the footer copyright text', () => {
    render(<Footer />);

    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
