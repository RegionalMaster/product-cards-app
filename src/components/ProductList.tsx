import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { useEffect, useMemo } from 'react'
import type { Product } from '../store/useStore'
import { LoadingSpinner } from './LoadingSpinner'

const ProductList = () => {
  const navigate = useNavigate()
  const {
    products,
    filter,
    searchQuery,
    currentPage,
    itemsPerPage,
    loading,
    error,
    toggleLike,
    deleteProduct,
    setFilter,
    setSearchQuery,
    setCurrentPage,
    setEditingProduct
  } = useStore()

  useEffect(() => {
    console.log('ProductList mounted')
    console.log('Current products:', products)
    console.log('Loading state:', loading)
    console.log('Error state:', error)
  }, [products, loading, error])

  // Filter and search products
  const filteredProducts = useMemo(() => {
    console.log('Filtering products with:', { filter, searchQuery })
    return products
      .filter(product => {
        const matchesFilter = filter === 'all' || (filter === 'liked' && product.isLiked)
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
      })
  }, [products, filter, searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const slicedProducts = filteredProducts.slice(start, end)
    console.log('Paginated products:', { 
      currentPage, 
      totalProducts: filteredProducts.length,
      displayedProducts: slicedProducts.length 
    })
    return slicedProducts
  }, [filteredProducts, currentPage, itemsPerPage])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="error">{error}</div>
  if (products.length === 0) return <div className="no-products">No products found</div>

  return (
    <div className="container">
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="no-results">No products match your search criteria</div>
      ) : (
        <div className="product-grid">
          {paginatedProducts.map(product => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                onClick={() => navigate(`/products/${product.id}`)}
              />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p className="price">${product.price}</p>
              <div className="card-actions">
                <button
                  className={`like-button ${product.isLiked ? 'liked' : ''}`}
                  onClick={() => toggleLike(product.id)}
                >
                  {product.isLiked ? '❤️' : '🤍'}
                </button>
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingProduct(product)
                    navigate(`/edit-product/${product.id}`)
                  }}
                >
                  ✏️
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
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={page === currentPage ? 'active' : ''}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductList
