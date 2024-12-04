export const APP_API_ENDPOINT = Object.freeze({
  AUTH: {
    LOGIN: '/api/Auth/login'
  },
  TRIPS: {
    GET_TRIPS: '/api/Trip',
    UPDATE_TRIPS: ({ id }: { id: string | number | null }) => `/api/Trip/updateTrip/${id}`
  },
  VEHICLES: {
    GET_VEHICLES: '/api/Vehicle/listVehicle',
    DELETE_VEHICLES: ({ id }: { id: string | number | null }) => `/api/Vehicle/deleteVehicleByStatus/${id}`,
    VEHICLES_DETAILS: ({ id }: { id: string | number | null }) => `/api/Vehicle/getInforVehicle/${id}`,
    ADD_VEHICLES: '/api/Vehicle/addVehicle'
  },
  USER_PROFILE: {
    GET_DATA: '/api/Auth/userProfile'
  }
})
