import { IAction } from '../interfaces';
import { IForecastResponseDataError, IForecastResponseDataSuccess, IForecastGrouped } from 'src/api/interfaces';

export type IWeatherActionType = 'WEATHER_FETCH' | 'WEATHER_SET';

export type IWeatherAction = IAction<IWeatherActionType>

export type IWeatherStateError = string | IForecastResponseDataError;

export interface IWeatherState {
  isFetching: boolean;
  error?: IWeatherStateError;
  forecast: {
    raw?: IForecastResponseDataSuccess;
    byDate?: IForecastGrouped[];
  };
}
