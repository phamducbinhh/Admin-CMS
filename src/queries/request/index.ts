import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import requestApiRequest from '@/services/request'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryRequest = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Request'],
    queryFn: async () => {
      const response = await requestApiRequest.GetRequest()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryRequestDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Request_details', id],
    queryFn: async () => {
      const response = await requestApiRequest.GetRequestDetails({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useAcceptCancleRequestMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => requestApiRequest.AcceptCancleRequest({ id })
  })
}

export const useAddVehicleByStaffMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null; isApprove: boolean }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, isApprove }: { id: string | number | null; isApprove: boolean }) =>
      requestApiRequest.AddVehicleByStaff({ id, isApprove })
  })
}
