import { create } from 'zustand'
import axios from 'axios'

export interface Product {
  id: number
  title: string
  description: string
  image: string
  isLiked: boolean
  price: number
}

interface ProductStore {
  products: Product[]
  loading: boolean
  error: string | null
  filter: 'all' | 'liked'
  fetchProducts: () => Promise<void>
  toggleLike: (productId: number) => void
  deleteProduct: (productId: number) => void
  setFilter: (filter: 'all' | 'liked') => void
  addProduct: (product: Omit<Product, 'id' | 'isLiked'>) => void
}

export const useStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  filter: 'all',

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
    set({ filter })
  },

  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // Simple way to generate unique ID
      isLiked: false
    }
    set(state => ({ products: [...state.products, newProduct] }))
  }
}))
