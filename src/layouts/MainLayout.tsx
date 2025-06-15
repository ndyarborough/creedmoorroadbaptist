import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-off-white text-grayBody">
      <Navbar />
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
