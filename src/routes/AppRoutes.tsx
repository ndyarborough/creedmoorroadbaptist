import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'

// Lazy load components
const Home = lazy(() => import('../pages/Home'))
const Events = lazy(() => import('../pages/Events'))
// const Groups = lazy(() => import('../pages/SmallGroups'))
const Giving = lazy(() => import('../pages/Give'))
const Sermons = lazy(() => import('../pages/Messages'))
const Contact = lazy(() => import('../pages/Contact'))
const About = lazy(() => import('../pages/About'))
const Login = lazy(() => import('../pages/Login'))
const Admin = lazy(() => import('../pages/Admin'))

// Keep these as regular imports since they're likely used immediately
import MainLayout from '../shared/layouts/MainLayout'
import PrivateRoute from '../shared/components/PrivateRoute'

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark"></div>
  </div>
)

// Helper function to wrap components with Suspense
const withSuspense = (Component: ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={withSuspense(Home)} />
      <Route path="/events" element={withSuspense(Events)} />
      <Route path="/about" element={withSuspense(About)} />
      {/* <Route path="/smallGroups" element={withSuspense(Groups)} /> */}
      <Route path="/give" element={withSuspense(Giving)} />
      <Route path="/messages" element={withSuspense(Sermons)} />
      <Route path="/contact" element={withSuspense(Contact)} />
      <Route path="/login" element={withSuspense(Login)} />
      <Route path="/admin" element={<PrivateRoute />}>
        <Route index element={withSuspense(Admin)} />
      </Route>
    </Route>
  </Routes>
)

export default AppRoutes  