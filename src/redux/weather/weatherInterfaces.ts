import { IAction } from '../interfaces';
import { IForecastResponseDataError, IForecastResponseDataSuccess } from 'src/utils/interfaces';

export type IWeatherActionType = 'WEATHER_FETCH' | 'WEATHER_SET';

export type IWeatherAction = IAction<IWeatherActionType>

export type IWeatherStateError = string | IForecastResponseDataError;

export interface IWeatherState {
  isFetching: boolean;
  error?: IWeatherStateError;
  data?: IForecastResponseDataSuccess;
}
