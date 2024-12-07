import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class VehicleApiRequest {
  public GetVehicles(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.GET_VEHICLES,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetTypeOfVehicles(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.TYPE_OF_VEHICLES,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetTypeOfVehiclesOwner(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.TYPE_VEHICLES_OWNER,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetVehiclesDetails({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.VEHICLES_DETAILS({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public DeleteVehicles({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.DELETE_VEHICLES({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public AdVehicles({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.ADD_VEHICLES,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const vehicleApiRequest = new VehicleApiRequest()

export default vehicleApiRequest
