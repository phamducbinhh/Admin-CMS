import { useRoutes } from 'react-router-dom'

export default function useRouteElements() {
  const routeElements = useRoutes([]) // thêm các router vào đây
  return routeElements
}
