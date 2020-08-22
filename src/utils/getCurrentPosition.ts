import Geolocation, { GeolocationOptions, GeolocationResponse } from '@react-native-community/geolocation'

export const defaultOptions: GeolocationOptions = {
  timeout: 10 * 1000,
  maximumAge: 3 * 1000,
  enableHighAccuracy: false,
}

const getCurrentPosition = (options?: GeolocationOptions): Promise<GeolocationResponse> => new Promise((resolve, reject) => {
  Geolocation.getCurrentPosition(resolve, reject, Object.assign({}, defaultOptions, options))
})

export default getCurrentPosition;
