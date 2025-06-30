import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Events from '../pages/Events'
import Groups from '../pages/SmallGroups'
import Giving from '../pages/Give'
import Sermons from '../pages/Messages'
import Contact from '../pages/Contact'
import About from '../pages/About'
import MainLayout from '../shared/layouts/MainLayout'
import Login from '../pages/Login'
import Admin from '../pages/Admin'
import PrivateRoute from '../shared/components/PrivateRoute'

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/about" element={<About />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/giving" element={<Giving />} />
      <Route path="/sermons" element={<Sermons />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<PrivateRoute />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Route>
  </Routes>
)

export default AppRoutes
