import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '../../constants/httpStatusCode.enum'
import userProfileApiRequest from '../../services/user-profile'
import { useLocalStorage } from '../../utils/localStorage/localStorageService'

export const useQueryUserProfile = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  const token = useLocalStorage.getLocalStorageData('token')

  return useQuery<any>({
    ...options,
    queryKey: ['user'],
    queryFn: async () => {
      const response = await userProfileApiRequest.GetUser({ token })
      if (response.status === HttpStatusCode.Ok) {
        // console.log('response', response)
        return response.data
      }
    }
  })
}
