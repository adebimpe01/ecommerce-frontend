import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import '@testing-library/jest-dom';
import { HomePage } from './HomePage';

vi.mock('axios');

describe('Homepage component', () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [
            {
              id: "1",
              image: "images/products/test.jpg",
              name: "Product 1",
              rating: { stars: 4.5, count: 87 },
              priceCents: 1090,
              keywords: ["test"]
            },
            {
              id: "2",
              image: "images/products/test2.jpg",
              name: "Product 2",
              rating: { stars: 4, count: 127 },
              priceCents: 2095,
              keywords: ["test"]
            }
          ]
        };
      }
    });
  });

  it('displays the products correctly', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    // Wait for products to appear
    const productContainers = await screen.findAllByTestId('product-container');
    expect(productContainers).toHaveLength(2);

    // Check names
    expect(within(productContainers[0]).getByText('Product 1')).toBeInTheDocument();
    expect(within(productContainers[1]).getByText('Product 2')).toBeInTheDocument();
  });

  it('can add a product to the cart', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    const addButtons = await screen.findAllByRole('button', { name: /add to cart/i });
    
    // Click the first "Add to cart" button
    await userEvent.click(addButtons[0]);

    // Expect loadCart to be called once
    expect(loadCart).toHaveBeenCalledTimes(1);
  });

  it('filters products by keyword', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search products/i);

    // Type a keyword and trigger filtering
    await userEvent.type(searchInput, 'test');

    // Wait for filtered results
    const filteredProducts = await screen.findAllByTestId('product-container');
    expect(filteredProducts.length).toBeGreaterThan(0);
  });
});