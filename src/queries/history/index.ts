import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import historyApiRequest from '@/services/history'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryHistoryRentVehicle = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['history_rent_vehicle'],
    queryFn: async () => {
      const response = await historyApiRequest.GetListHistoryRentVehicle()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryHistoryRentDriver = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['history_rent_driver'],
    queryFn: async () => {
      const response = await historyApiRequest.GetListHistoryRentDriver()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryDriverRent = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['driver_rent'],
    queryFn: async () => {
      const response = await historyApiRequest.GetListDriverRent()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryVehicleRent = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicle_rent'],
    queryFn: async () => {
      const response = await historyApiRequest.GetListVehicleRent()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
