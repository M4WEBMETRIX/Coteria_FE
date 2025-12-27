import { Navigate, Outlet } from 'react-router-dom'

const isAuthenticated = () => {
  return true
  //   return !!localStorage.getItem('token')
}

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to='/auth/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
