import { apiBaseServiceInstance } from '../../api'
import { APP_API_ENDPOINT } from '../../config/api'
import { METHOD_TYPE } from '../../config/method'

class UserProfileApiRequest {
  public GetUser({ token }: { token: string }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.USER_PROFILE.GET_DATA,
      config: { method: METHOD_TYPE.GET, token, cors: false }
    })
  }
}

const userProfileApiRequest = new UserProfileApiRequest()

export default userProfileApiRequest
