// src/components/Navbar.tsx
import { Link } from 'react-router-dom'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    ['Events', '/events'],
    ['Small Groups', '/smallGroups'],
    ['About', '/about'],
    ['Messages', '/messages'],
    ['Contact', '/contact'],
    ['Give', '/give']
  ]

  return (
    <nav className="bg-bg-primary border-b border-gray-border">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + title/tagline */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="CRBC logo" className="h-8 w-auto" />
            <div className='flex flex-col'>
              <div className="text-lg font-bold">Creedmoor Road Baptist</div>
              <div className="section-body">Love. Grow. Go</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map(([label, to]) => (
              <Link key={to} to={to} className="nav-item">
                {label}
              </Link>
            ))}
          </div>
          <div className='flex'>
            <Link
              to="/give"
              onClick={() => setOpen(false)}
              className="bg-red text-white px-4 py-2 rounded-default mt-2 text-center"
            >
              Give Online
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden px-1 text-gray-body"
              aria-label="Open menu"
            >
              <MenuIcon fontSize="large" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-out menu */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="relative ml-auto w-64 bg-off-white p-4 flex flex-col space-y-4">
            <button
              onClick={() => setOpen(false)}
              className="self-end p-1 text-gray-body"
              aria-label="Close menu"
            >
              <CloseIcon fontSize="large" />
            </button>
            {links.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="nav-item block"
              >
                {label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </nav>
  )
}
