import { create } from 'zustand'
import axios from 'axios'

export interface Product {
  id: number
  title: string
  description: string
  image: string
  isLiked: boolean
  price: number
  category?: string
}

interface ProductStore {
  products: Product[]
  loading: boolean
  error: string | null
  filter: 'all' | 'liked'
  searchQuery: string
  currentPage: number
  itemsPerPage: number
  editingProduct: Product | null
  fetchProducts: () => Promise<void>
  toggleLike: (productId: number) => void
  deleteProduct: (productId: number) => void
  setFilter: (filter: 'all' | 'liked') => void
  setSearchQuery: (query: string) => void
  setCurrentPage: (page: number) => void
  addProduct: (product: Omit<Product, 'id' | 'isLiked'>) => void
  updateProduct: (product: Product) => void
  setEditingProduct: (product: Product | null) => void
}

export const useStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  filter: 'all',
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 8,
  editingProduct: null,

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('https://fakestoreapi.com/products')
      const products = response.data.map((product: any) => ({
        ...product,
        isLiked: false
      }))
      set({ products, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false })
    }
  },

  toggleLike: (productId) => {
    const products = get().products.map(product =>
      product.id === productId
        ? { ...product, isLiked: !product.isLiked }
        : product
    )
    set({ products })
  },

  deleteProduct: (productId) => {
    const products = get().products.filter(product => product.id !== productId)
    set({ products })
  },

  setFilter: (filter) => {
    set({ filter, currentPage: 1 }) // Reset to first page when filtering
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 }) // Reset to first page when searching
  },

  setCurrentPage: (page) => {
    set({ currentPage: page })
  },

  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      isLiked: false
    }
    set(state => ({ products: [...state.products, newProduct] }))
  },

  updateProduct: (product) => {
    const products = get().products.map(p =>
      p.id === product.id ? { ...product } : p
    )
    set({ products, editingProduct: null })
  },

  setEditingProduct: (product) => {
    set({ editingProduct: product })
  }
}))
