import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import SmoothScroll from './components/animation/SmoothScroll'

import Home from './pages/Home/Home'
import Technology from './pages/Technology/Technology'
import Products from './pages/Products/Products'
import Research from './pages/Research/Research'
import Company from './pages/Company/Company'
import Careers from './pages/Careers/Careers'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <SmoothScroll>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/products" element={<Products />} />
          <Route path="/research" element={<Research />} />
          <Route path="/company" element={<Company />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </SmoothScroll>
  )
}

export default App