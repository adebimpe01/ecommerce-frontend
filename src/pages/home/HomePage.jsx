import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../component/Header';
import { ProductGrid } from './productGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  

    useEffect( () => {
      const getHomeData = async () => {
         const response = await axios.get('api/products')
        setProducts(response.data);
        };
        getHomeData();
      }, []);
  return (      
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}