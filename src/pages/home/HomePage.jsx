import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../component/Header';
import { ProductGrid } from './productGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        console.log('Products fetched:', response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        console.error('API URL:', import.meta.env.VITE_API_URL);
        setError(err.message);
      }
    };
    getHomeData();
  }, []);
  return (      
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        {error && (
          <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
            <h2>Error loading products</h2>
            <p>{error}</p>
            <p>API URL: {import.meta.env.VITE_API_URL}</p>
          </div>
        )}
        {products.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '20px' }}>Loading products...</div>
        )}
        {products.length > 0 && <ProductGrid products={products} loadCart={loadCart} />}
      </div>
    </>
  );
}