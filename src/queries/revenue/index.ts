import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import revenueApiRequest from '@/services/revenue'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryRevenue = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['revenue'],
    queryFn: async () => {
      const response = await revenueApiRequest.GetListRevenue()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useExportRevenueMutation = (
  options?: UseMutationOptions<
    any, // Response type
    unknown, // Error type
    { body: any }, // Mutation variables type
    unknown // Context type
  >
) => {
  return useMutation({
    ...options,
    mutationFn: ({ body }: { body: any }) => revenueApiRequest.ExportRevenue({ body })
  })
}
