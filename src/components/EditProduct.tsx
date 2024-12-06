import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { Product } from '../store/useStore'

const EditProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const updateProduct = useStore(state => state.updateProduct)
  const products = useStore(state => state.products)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<Omit<Product, 'id' | 'isLiked'>>({
    title: '',
    description: '',
    price: 0,
    image: '',
    category: ''
  })

  useEffect(() => {
    const product = products.find(p => p.id === Number(id))
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category || ''
      })
    }
  }, [id, products])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required'
    if (!formData.image.trim()) newErrors.image = 'Image URL is required'
    if (!formData.category.trim()) newErrors.category = 'Category is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      updateProduct({
        id: Number(id),
        ...formData,
        isLiked: false
      })
      navigate('/')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className={errors.price ? 'error' : ''}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={errors.image ? 'error' : ''}
          />
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
          />
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
