import { IWeatherAction, IWeatherState } from './weatherInterfaces'
import { weatherActionTypes } from './weatherActions'
import forecastParse from 'src/utils/forecastParse'

export const initialWeatherState: IWeatherState = {
  isFetching: false,
  error: '',
  forecast: {},
}

const weatherReducer = (state = initialWeatherState, action: IWeatherAction): IWeatherState => {
  switch (action.type) {
    case weatherActionTypes.WEATHER_SET:
      return {
        ...state,
        isFetching: false,
        error: action.error || '',
        forecast: {
          raw: action.payload || state.forecast.raw || initialWeatherState.forecast.raw,
          byDate: action.payload ? forecastParse(action.payload) : (state.forecast.byDate || initialWeatherState.forecast.byDate),
        },
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
