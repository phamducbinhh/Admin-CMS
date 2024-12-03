import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '../../constants/httpStatusCode.enum'
import { TLoginAuth } from '../../types/auth'
import authApiRequest from '../../services/auth'

export const useLoginMutation = (options?: UseMutationOptions<any, unknown, TLoginAuth, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<TLoginAuth, 'login'>) => authApiRequest.Login({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        console.log(data)
      }
    }
  })
}
