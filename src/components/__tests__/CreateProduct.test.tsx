import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CreateProduct } from '../CreateProduct'
import { useStore } from '../../store/useStore'
import { vi } from 'vitest'

vi.mock('../../store/useStore', () => ({
  useStore: vi.fn()
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual as any,
    useNavigate: () => mockNavigate
  }
})

describe('CreateProduct', () => {
  beforeEach(() => {
    const addProduct = vi.fn()
    ;(useStore as any).mockReturnValue({ addProduct })
  })

  it('renders form fields', () => {
    render(
      <BrowserRouter>
        <CreateProduct />
      </BrowserRouter>
    )
    
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Image URL')).toBeInTheDocument()
    expect(screen.getByLabelText('Price')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(
      <BrowserRouter>
        <CreateProduct />
      </BrowserRouter>
    )
    
    fireEvent.click(screen.getByText('Create Product'))
    
    expect(await screen.findByText('Title is required')).toBeInTheDocument()
    expect(await screen.findByText('Description is required')).toBeInTheDocument()
    expect(await screen.findByText('Image URL is required')).toBeInTheDocument()
    expect(await screen.findByText('Valid price is required')).toBeInTheDocument()
  })

  it('submits form with valid data', () => {
    const addProduct = vi.fn()
    ;(useStore as any).mockReturnValue({ addProduct })

    render(
      <BrowserRouter>
        <CreateProduct />
      </BrowserRouter>
    )
    
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Test Product' }
    })
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' }
    })
    fireEvent.change(screen.getByLabelText('Image URL'), {
      target: { value: 'test.jpg' }
    })
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '99.99' }
    })
    
    fireEvent.click(screen.getByText('Create Product'))
    
    expect(addProduct).toHaveBeenCalledWith({
      title: 'Test Product',
      description: 'Test Description',
      image: 'test.jpg',
      price: 99.99
    })
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('navigates back on cancel', () => {
    render(
      <BrowserRouter>
        <CreateProduct />
      </BrowserRouter>
    )
    
    fireEvent.click(screen.getByText('Cancel'))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
