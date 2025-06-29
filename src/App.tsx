// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home        from './pages/Home'
import Events      from './pages/Events'
import About       from './pages/About'
import SmallGroups from './pages/SmallGroups'
import Give        from './pages/Give'
import Messages    from './pages/Messages'
import Contact     from './pages/Contact'
import MainLayout from './shared/layouts/MainLayout'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route
            index
            element={
                <Home />
            }
          />

          {/* Events */}
          <Route
            path="events"
            element={
                <Events />
            }
          />

          {/* About */}
          <Route
            path="about"
            element={
                <About />
            }
          />

          {/* Small Groups */}
          <Route
            path="smallGroups"
            element={
                <SmallGroups />
            }
          />

          {/* Giving */}
          <Route
            path="give"
            element={
                <Give />
            }
          />

          {/* Messages */}
          <Route
            path="messages"
            element={
                <Messages />
            }
          />

          {/* Contact */}
          <Route
            path="contact"
            element={
                <Contact />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
