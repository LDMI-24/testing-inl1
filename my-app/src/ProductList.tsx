import { useState, useEffect } from 'react'
import { type IProduct } from './models/IProduct';

export const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState (true);

  useEffect( () => {
    fetch('https://my.api.mockaroo.com/products.json?key=6579b850')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('failed to fetch products', error);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }


  return (
    <>
    <h1>All Products</h1>

    <ul className='productList'>         
        {products.map((p) => (
        <li key={p.id} className='product'>
          <h2>{p.productName}</h2>
          <p className="productDesc">{p.productDesc}</p>
          <p className="productPrice">{p.price} Kr</p>
          <button className='addToCart'>Add to cart</button>
          <button className='removeFromCart'>Remove from cart</button>
        </li>        
        ))}
    </ul>
    </>
  );
};

/* Add later
          <button className='addToCart' onClick={() => addToCart(p.id)}>Add to cart</button>
          <button className='removeFromCart' onClick={() => removeFromCart(p.id)}>Remove from cart</button>
*/
