import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export function CreateProduct() {
  const navigate = useNavigate()
  const { addProduct } = useStore()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: ''
  })

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required'
    }
    if (!formData.price || isNaN(Number(formData.price))) {
      newErrors.price = 'Valid price is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validate()) {
      addProduct({
        title: formData.title,
        description: formData.description,
        image: formData.image,
        price: Number(formData.price)
      })
      navigate('/')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="container">
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <span className="error">{errors.image}</span>}
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
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
          <button type="submit">Create Product</button>
        </div>
      </form>
    </div>
  )
}
