import { IWeatherAction, IWeatherState } from './weatherInterfaces'
import { weatherActionTypes } from './weatherActions'

export const initialWeatherState: IWeatherState = {
  isFetching: false,
  error: '',
  data: undefined,
}

const weatherReducer = (state = initialWeatherState, action: IWeatherAction): IWeatherState => {
  switch (action.type) {
    case weatherActionTypes.WEATHER_SET:
      return {
        ...state,
        isFetching: false,
        error: action.error || '',
        data: action.payload || state.data || initialWeatherState.data,
      }
    case weatherActionTypes.WEATHER_FETCH:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    default:
      return state;
  }
}

export default weatherReducer;
