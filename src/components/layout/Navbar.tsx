import { NavLink } from 'react-router-dom'

import './Navbar.css'

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Technology', path: '/technology' },
  { label: 'Products', path: '/products' },
  { label: 'Research', path: '/research' },
  { label: 'Company', path: '/company' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
]

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        NEXUS<span>®</span>
      </div>

      <nav className="navbar__nav">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button className="navbar__language">
        EN
      </button>
    </header>
  )
}

export default Navbar