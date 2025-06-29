import { Outlet } from 'react-router-dom'
import Navbar from '../semantic/Navbar'
import Footer from '../semantic/Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-off-white text-grayBody">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
