import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/authentications/signup-page'
import ProtectedRoute from './pages/authentications/protect-route'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='auth/signup' element={<SignupPage />} />
      <Route path='auth/login' element={<>this is login page</>} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='dashboard' element={<>Dashboard Page</>} />
      </Route>
    </Routes>
  )
}

export default AllRoutes
