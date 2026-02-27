import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services' },
  { label: 'Case Studies', to: '/#case-studies' },
]

export default function Navbar({ onContactClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  function handleNavClick(e, to) {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (to === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/')
      }
      return
    }

    const hash = to.replace('/', '')
    if (location.pathname === '/') {
      const el = document.getElementById(hash.slice(1))
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(to)
    }
  }

  return (
    <div className="mx-auto max-w-[1100px] px-10 max-md:px-4">
      <nav className="flex items-center justify-between py-4 bg-white" aria-label="Main navigation">
        <Link to="/" className="shrink-0">
          <img
            src="/img/optimized_logo.png"
            alt="A3DI Logo"
            width="300"
            height="100"
            className="w-[200px] h-auto"
          />
        </Link>

        {/* Hamburger button */}
        <button
          type="button"
          className="lg:hidden p-2 text-secondary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="nav-menu"
          aria-label="Toggle navigation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>

        {/* Nav links */}
        <ul
          id="nav-menu"
          className={`${isMobileMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-1 absolute lg:static top-[100px] left-0 right-0 bg-white z-50 lg:z-auto pb-4 lg:pb-0 shadow-md lg:shadow-none`}
        >
          {navItems.map(({ label, to }) => (
            <li key={label} className="text-center">
              <a
                href={to}
                onClick={(e) => handleNavClick(e, to)}
                className="block px-2.5 py-2.5 text-secondary hover:text-primary transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                onContactClick()
              }}
              className="bg-primary text-white px-5 py-2 rounded text-sm font-normal cursor-pointer hover:bg-primary/90 transition-colors"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
