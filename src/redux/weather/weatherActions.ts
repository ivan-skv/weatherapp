import { IWeatherActionType, IWeatherStateError } from './weatherInterfaces';
import { IAction, IActionTypes } from '../interfaces';
import { IForecastRequestParams, IForecastResponseDataSuccess } from 'src/utils/interfaces';

export const weatherActionTypes: IActionTypes<IWeatherActionType> = {
  WEATHER_SET: 'WEATHER_SET',
  WEATHER_FETCH: 'WEATHER_FETCH',
}

export const weatherFetch = (params: IForecastRequestParams): IAction<IWeatherActionType, IForecastRequestParams> => ({ type: weatherActionTypes.WEATHER_FETCH, payload: params })

export const weatherSet = (data: IForecastResponseDataSuccess): IAction<IWeatherActionType, IForecastResponseDataSuccess> => ({ type: weatherActionTypes.WEATHER_SET, payload: data })

export const weatherSetError = (error: IWeatherStateError): IAction<IWeatherActionType> => ({ type: weatherActionTypes.WEATHER_SET, payload: { error } })
