import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ProductList } from '../ProductList'
import { useStore } from '../../store/useStore'
import { vi } from 'vitest'

// Mock the store
vi.mock('../../store/useStore', () => ({
  useStore: vi.fn()
}))

const mockProducts = [
  {
    id: 1,
    title: 'Test Product',
    description: 'Test Description',
    image: 'test.jpg',
    price: 99.99,
    isLiked: false
  }
]

describe('ProductList', () => {
  beforeEach(() => {
    (useStore as any).mockReturnValue({
      products: mockProducts,
      filter: 'all',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 8,
      loading: false,
      error: null,
      toggleLike: vi.fn(),
      deleteProduct: vi.fn(),
      setFilter: vi.fn(),
      setSearchQuery: vi.fn(),
      setCurrentPage: vi.fn(),
      setEditingProduct: vi.fn()
    })
  })

  it('renders product list', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    (useStore as any).mockReturnValue({
      ...useStore(),
      loading: true
    })

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('shows error state', () => {
    (useStore as any).mockReturnValue({
      ...useStore(),
      error: 'Failed to load products'
    })

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Failed to load products')).toBeInTheDocument()
  })

  it('filters products', () => {
    const setFilter = vi.fn()
    ;(useStore as any).mockReturnValue({
      ...useStore(),
      setFilter
    })

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    )
    
    fireEvent.click(screen.getByText('Liked Products'))
    expect(setFilter).toHaveBeenCalledWith('liked')
  })

  it('searches products', () => {
    const setSearchQuery = vi.fn()
    ;(useStore as any).mockReturnValue({
      ...useStore(),
      setSearchQuery
    })

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    )
    
    const searchInput = screen.getByPlaceholderText('Search products...')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(setSearchQuery).toHaveBeenCalledWith('test')
  })
})
