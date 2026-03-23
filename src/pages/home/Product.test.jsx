import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Product } from './product';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('Product component', () => {
  let product;
  let loadCart;

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: { stars: 4.5, count: 87 },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    };

    loadCart = vi.fn();

    // Mock axios post
    axios.post = vi.fn().mockResolvedValue({ data: {} });
  });

  it('displays the product details correctly', () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText('$10.90')).toBeInTheDocument();

    expect(screen.getByTestId('product-image')).toHaveAttribute(
      'src',
      product.image
    );

    expect(screen.getByTestId('product-rating-stars-image')).toHaveAttribute(
      'src',
      'images/ratings/rating-45.png'
    );

    expect(screen.getByTestId('product-rating-count')).toBeInTheDocument();
  });

  it('adds a product to the cart', async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: product.id,
      quantity: 1
    });

    expect(loadCart).toHaveBeenCalled();
  });
});