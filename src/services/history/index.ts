import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class HistoryApiRequest {
  public GetListHistoryRentVehicle(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.HISTORY_RENT_VEHICLE.GET_HISTORY_RENT_VEHICLE,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetListHistoryRentDriver(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.HISTORY_RENT_DRIVER.GET_HISTORY_RENT_DRIVER,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetListDriverRent(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.HISTORY_RENT_DRIVER.GET_LIST_DRIVER_RENT,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
}

const historyApiRequest = new HistoryApiRequest()

export default historyApiRequest
