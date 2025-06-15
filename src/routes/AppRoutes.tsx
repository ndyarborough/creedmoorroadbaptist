import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

import Home from '../pages/Home'
import Events from '../pages/Events'
import Groups from '../pages/Groups'
import Giving from '../pages/Giving'
import Sermons from '../pages/Sermons'
import Contact from '../pages/Contact'
import About from '../pages/About'

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
    </Route>
  </Routes>
)

export default AppRoutes
