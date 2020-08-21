import { ICityState, ICityAction } from './cityInterfaces';
import { cityActionTypes } from './cityActions';

export const initialCityState: ICityState = {
  name: undefined,
}

const cityReducer = (state: ICityState = initialCityState, action: ICityAction): ICityState => {
  switch (action.type) {
    case cityActionTypes.CITY_SET:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}

export default cityReducer;
