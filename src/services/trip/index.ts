import { apiBaseServiceInstance } from '../../api'
import { APP_API_ENDPOINT } from '../../config/api'
import { METHOD_TYPE } from '../../config/method'

class TripsApiRequest {
  public GetTrips({ token }: { token: string }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.GET_TRIPS,
      config: { method: METHOD_TYPE.GET, token, cors: false }
    })
  }
}

const tripsApiRequest = new TripsApiRequest()

export default tripsApiRequest
