import { useRoutes } from 'react-router-dom'
import LoginPage from './pages/public/login'

// import Home from './pages/private/trips'
import PrivateLayout from './pages/private'
import TripsPages from './pages/private/trips'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <PrivateLayout />,
      children: [
        {
          path: '/trips',
          element: <TripsPages />
        }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    }
  ]) // thêm các router vào đây
  return routeElements
}
