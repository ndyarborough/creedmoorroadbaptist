// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import PageLayout from './layouts/PageLayout'

import Home        from './pages/Home'
import Events      from './pages/Events'
import About       from './pages/About'
import SmallGroups from './pages/SmallGroups'
import Give        from './pages/Give'
import Messages    from './pages/Messages'
import Contact     from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route
            index
            element={
              <PageLayout pageId="home">
                <Home />
              </PageLayout>
            }
          />

          {/* Events */}
          <Route
            path="events"
            element={
              <PageLayout pageId="events">
                <Events />
              </PageLayout>
            }
          />

          {/* About */}
          <Route
            path="about"
            element={
              <PageLayout pageId="about">
                <About />
              </PageLayout>
            }
          />

          {/* Small Groups */}
          <Route
            path="smallGroups"
            element={
              <PageLayout pageId="smallGroups">
                <SmallGroups />
              </PageLayout>
            }
          />

          {/* Giving */}
          <Route
            path="give"
            element={
              <PageLayout pageId="give">
                <Give />
              </PageLayout>
            }
          />

          {/* Messages */}
          <Route
            path="messages"
            element={
              <PageLayout pageId="messages">
                <Messages />
              </PageLayout>
            }
          />

          {/* Contact */}
          <Route
            path="contact"
            element={
              <PageLayout pageId="contact">
                <Contact />
              </PageLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
