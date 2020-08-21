import { IAction } from '../interfaces'

export type ICityActionType = 'CITY_SET'

export interface ICityState {
  name?: string;
  lon?: number;
  lat?: number;
}

export interface ICityAction extends IAction<ICityActionType, ICityState> { }
