import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import ticketApiRequest from '@/services/ticket'
import { FilterParams } from '@/types/DataType'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryTicket = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Ticket'],
    queryFn: async () => {
      const response = await ticketApiRequest.GetTicket()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
// export const useQueryTicketTotal = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
//   return useQuery<any>({
//     ...options,
//     queryKey: ['Ticket_total'],
//     queryFn: async () => {
//       const response = await ticketApiRequest.GetTotalTicket()
//       if (response.status === HttpStatusCode.Ok) {
//         return response.data
//       }
//     }
//   })
// }

export const useQueryTicketTotal = (
  { startDate, endDate, vehicleId }: FilterParams,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Ticket_total', { startDate, endDate, vehicleId }],
    queryFn: async () => {
      const response = await ticketApiRequest.GetTotalTicket({
        startDate: startDate || '',
        endDate: endDate || '',
        vehicleId: vehicleId || ''
      })

      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
      throw new Error('Failed to fetch data')
    }
  })
}

export const useQueryTicketDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Ticket_details', id],
    queryFn: async () => {
      const response = await ticketApiRequest.GetTicketDetails({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryTravelCarByRequest = (
  {
    id,
    startDate,
    endDate
  }: {
    id: string | number | null | any
    startDate: string | number | null | any
    endDate: string | number | null | any
  },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['TravelCar_details', id],
    queryFn: async () => {
      const response = await ticketApiRequest.GetTravelCarByRequest({ id, startDate, endDate })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryTicketNotPaid = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Ticket_not_paid', id],
    queryFn: async () => {
      const response = await ticketApiRequest.GetTicketNotPaid({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useRemoveTicketMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => ticketApiRequest.DeleteTicket({ id })
  })
}
export const useUpdateStatusTicketMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => ticketApiRequest.UpdateStatusTicket({ id })
  })
}

export const useUpdateTicketMutation = (
  options?: UseMutationOptions<
    any, // Response type
    unknown, // Error type
    { id: string | number; body: any }, // Mutation variables type
    unknown // Context type
  >
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: any }) => ticketApiRequest.UpdateTicket({ id, body })
  })
}

export const useQueryCheckPrice = (
  {
    pointStart,
    pointEnd
  }: {
    pointStart: string | number | null | any
    pointEnd: string | number | null | any
  },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['check_price', pointStart, pointEnd],
    queryFn: async () => {
      const response = await ticketApiRequest.GetCheckPrice({ pointStart, pointEnd })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
