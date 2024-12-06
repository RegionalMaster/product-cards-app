import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'

export function ProductList() {
  const { products, filter, toggleLike, deleteProduct, setFilter } = useStore()
  const navigate = useNavigate()

  const filteredProducts = filter === 'liked' 
    ? products.filter(product => product.isLiked)
    : products

  return (
    <div className="container">
      <div className="filter-controls">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Products
        </button>
        <button 
          className={`filter-button ${filter === 'liked' ? 'active' : ''}`}
          onClick={() => setFilter('liked')}
        >
          Liked Products
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img 
              src={product.image} 
              alt={product.title} 
              onClick={() => navigate(`/products/${product.id}`)}
              style={{ cursor: 'pointer' }}
            />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <div className="card-actions">
              <button 
                className={`like-button ${product.isLiked ? 'liked' : ''}`}
                onClick={() => toggleLike(product.id)}
              >
                {product.isLiked ? '❤️' : '🤍'}
              </button>
              <button 
                className="delete-button"
                onClick={() => deleteProduct(product.id)}
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
