import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import accountApiRequest from '@/services/account'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryAccount = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['account'],
    queryFn: async () => {
      const response = await accountApiRequest.GetListAccount()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryRole = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['account_role'],
    queryFn: async () => {
      const response = await accountApiRequest.GetListRole()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryAccountDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Account_details', id],
    queryFn: async () => {
      const response = await accountApiRequest.GetAccountDetails({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useUpdateRoleAccountMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number; newRoleId: string | number }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, newRoleId }: { id: string | number; newRoleId: string | number }) =>
      accountApiRequest.UpdateRoleAccount({ id, newRoleId })
  })
}
