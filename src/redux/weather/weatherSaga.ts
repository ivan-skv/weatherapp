import { call, put, takeLeading } from 'redux-saga/effects'
import { IWeatherAction } from './weatherInterfaces';
import * as api from 'src/api'
import { weatherSet, weatherSetError, weatherActionTypes } from './weatherActions';
import { IForecastResponse, IForecastResponseDataSuccess, IForecastResponseDataError } from 'src/api/interfaces';

export function* weatherFetchSaga(action: IWeatherAction) {
  try {
    const response: IForecastResponse = yield call(api.forecast, action.payload)
    if (response.ok) {
      yield put(weatherSet(response.data as IForecastResponseDataSuccess))
    } else if (response.data) {
      yield put(weatherSetError(response.data as IForecastResponseDataError))
    } else {
      yield put(weatherSetError(response.problem))
    }
  } catch (e) {
    yield put(weatherSetError('internal'));
  }
}

export default function* weatherSaga() {
  yield takeLeading(weatherActionTypes.WEATHER_FETCH, weatherFetchSaga);
}
