import { IGeolocationState, IGeolocationAction } from './geolocationIntefaces';
import { geolocationActionTypes } from './geolocationActions';

export const initialGeolocationState: IGeolocationState = {
  isFetching: false,
  error: '',
  data: undefined,
}

const geolocationReducer = (state: IGeolocationState = initialGeolocationState, action: IGeolocationAction): IGeolocationState => {
  switch (action.type) {
    case geolocationActionTypes.GEOLOCATION_FETCH:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case geolocationActionTypes.GEOLOCATION_SET:
      return {
        ...state,
        isFetching: false,
        error: action.error || '',
        data: action.payload || initialGeolocationState.data,
      }
    default:
      return state;
  }
}

export default geolocationReducer;
