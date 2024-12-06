import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useStore } from './store/useStore'
import { ProductList } from './components/ProductList'
import { ProductDetail } from './components/ProductDetail'
import { CreateProduct } from './components/CreateProduct'
import './App.css'

function App() {
  const { fetchProducts } = useStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="nav-brand">Product Cards</Link>
        <Link to="/create-product" className="nav-link">Create Product</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
