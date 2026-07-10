import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./components/HomePage', () => ({ default: () => <div>Home Page</div> }));
vi.mock('./components/ProductsPage', () => ({ default: () => <div>Products Page</div> }));
vi.mock('./components/LoginPage', () => ({ default: () => <div>Login Page</div> }));
vi.mock('./components/AdminPage', () => ({ default: () => <div>Admin Page</div> }));
vi.mock('./components/CartPage', () => ({ default: () => <div>Cart Page</div> }));

describe('App', () => {
  it('renders the home page route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders the products route', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Products Page')).toBeInTheDocument();
  });

  it('renders the login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders the admin route', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Page')).toBeInTheDocument();
  });

  it('renders the cart route', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Cart Page')).toBeInTheDocument();
  });
});
