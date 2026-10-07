import {
  Routes,
  Route,
} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import Preloader from './components/animation/Preloader'

import Home from './pages/Home/Home'
import Research from './pages/Research/Research'
import Company from './pages/Company/Company'
import Careers from './pages/Careers/Careers'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <>
      <ScrollToTop />

      <Preloader />

      <Navbar />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/research"
            element={<Research />}
          />

          <Route
            path="/company"
            element={<Company />}
          />

          <Route
            path="/careers"
            element={<Careers />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App