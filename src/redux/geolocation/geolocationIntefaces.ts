import { GeolocationResponse } from '@react-native-community/geolocation'
import { IAction } from '../interfaces';

export type IGeolocationActionType = 'GEOLOCATION_FETCH' | 'GEOLOCATION_SET'

export interface IGeolocationAction extends IAction<IGeolocationActionType> { }

export interface IGeolocationState {
  isFetching: boolean;
  error?: string;
  data?: GeolocationResponse;
}
