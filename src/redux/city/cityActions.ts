import { IAction, IActionTypes } from '../interfaces';
import { ICityActionType, ICityState } from './cityInterfaces';

export const cityActionTypes: IActionTypes<ICityActionType> = {
  CITY_SET: 'CITY_SET',
}

export const citySet = (city: ICityState): IAction<ICityActionType, ICityState> => ({ type: cityActionTypes.CITY_SET, payload: city })
