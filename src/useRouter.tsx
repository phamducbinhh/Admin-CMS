import { useRoutes } from 'react-router-dom'
import LoginPage from './pages/public/login'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/login',
      element: <LoginPage />
    }
  ]) // thêm các router vào đây
  return routeElements
}
