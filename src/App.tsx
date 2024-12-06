import { useState } from 'react'
import './App.css'

// Define our Product type using TypeScript
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  isLiked: boolean;
}

function App() {
  // State to store our products
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Test Product",
      description: "This is a test product description",
      image: "https://via.placeholder.com/200",
      isLiked: false
    },
    {
      id: 2,
      title: "Another Product",
      description: "Description for another product",
      image: "https://via.placeholder.com/200",
      isLiked: false
    }
  ]);

  // Function to handle liking a product
  const handleLike = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isLiked: !product.isLiked }
        : product
    ));
  };

  // Function to handle deleting a product
  const handleDelete = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <div className="card-actions">
              <button 
                className={`like-button ${product.isLiked ? 'liked' : ''}`}
                onClick={() => handleLike(product.id)}
              >
                {product.isLiked ? '❤️' : '🤍'}
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
