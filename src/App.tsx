import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { useStore } from './store/useStore'
import ProductList from './components/ProductList'
import CreateProduct from './components/CreateProduct'
import EditProduct from './components/EditProduct'
import ProductDetails from './components/ProductDetails'
import './App.css'

function App() {
  const fetchProducts = useStore(state => state.fetchProducts)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Router basename="/product-cards-app">
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="nav-brand">Product Cards</Link>
          <Link to="/create-product" className="nav-link">Create Product</Link>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
