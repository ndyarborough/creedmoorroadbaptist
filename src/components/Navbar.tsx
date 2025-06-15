import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-off-white">
      <Link to="/" className="text-lg font-bold">CRBC</Link>
      <div className="space-x-4 text-sm">
        <Link className='nav-item' to="/events">Events</Link>
        <Link className='nav-item' to="/about">About</Link>
        <Link className='nav-item' to="/groups">Groups</Link>
        <Link className='nav-item' to="/giving">Giving</Link>
        <Link className='nav-item' to="/sermons">Sermons</Link>
        <Link className='nav-item' to="/contact">Contact</Link>
      </div>
    </nav>
  )
}

export default Navbar
