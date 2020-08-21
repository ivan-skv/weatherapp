import { IGeolocationActionType } from './geolocationIntefaces';
import { GeolocationResponse } from '@react-native-community/geolocation';

export const geolocationActionTypes: { [x in IGeolocationActionType]: IGeolocationActionType } = {
  GEOLOCATION_FETCH: 'GEOLOCATION_FETCH',
  GEOLOCATION_SET: 'GEOLOCATION_SET',
}

export const geolocationFetch = () => ({ type: geolocationActionTypes.GEOLOCATION_FETCH })

export const geolocationSet = (data: GeolocationResponse) => ({ type: geolocationActionTypes.GEOLOCATION_SET, payload: data })

export const geolocationSetError = (error: string) => ({ type: geolocationActionTypes.GEOLOCATION_SET, error })
