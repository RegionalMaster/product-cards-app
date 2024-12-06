import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const products = useStore(state => state.products)
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="product-details-container">
        <div className="error">Product not found</div>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="product-details-container">
      <button onClick={() => navigate('/')} className="back-button">
        Back to Products
      </button>
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="description">{product.description}</p>
          <p className="price">${product.price}</p>
          <p className="category">Category: {product.category}</p>
          <div className="actions">
            <button
              onClick={() => {
                useStore.getState().setEditingProduct(product)
                navigate(`/edit-product/${product.id}`)
              }}
              className="edit-button"
            >
              Edit Product
            </button>
            <button
              onClick={() => {
                useStore.getState().deleteProduct(product.id)
                navigate('/')
              }}
              className="delete-button"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
