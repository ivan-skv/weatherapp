import { IWeatherState } from './weather/weatherInterfaces';
import { ICityState } from './city/cityInterfaces';

export interface IAction<T, U = any, V = any> {
  type: T;
  payload?: U;
  error?: V;
}

export type IActionTypes<T extends string> = {
  [x in T]: T;
}

export interface IStore {
  weather: IWeatherState;
  city: ICityState;
}
