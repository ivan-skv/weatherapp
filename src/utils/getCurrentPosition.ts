import Geolocation, { GeolocationOptions, GeolocationResponse } from '@react-native-community/geolocation'

const getCurrentPosition = (options?: GeolocationOptions): Promise<GeolocationResponse> => new Promise((resolve, reject) => {
  Geolocation.getCurrentPosition(resolve, reject, options)
})

export default getCurrentPosition;
