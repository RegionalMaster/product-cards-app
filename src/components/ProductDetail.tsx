import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, toggleLike } = useStore()
  
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Products
      </button>
      
      <div className="product-detail">
        <img src={product.image} alt={product.title} />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <button 
            className={`like-button large ${product.isLiked ? 'liked' : ''}`}
            onClick={() => toggleLike(product.id)}
          >
            {product.isLiked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  )
}
