import { put, call, takeLatest } from 'redux-saga/effects'
import { IGeolocationAction } from './geolocationIntefaces';
import getCurrentPosition from 'src/utils/getCurrentPosition';
import { geolocationSet, geolocationSetError, geolocationActionTypes } from './geolocationActions';
import { GeolocationResponse } from '@react-native-community/geolocation';
import requestAndroidPermissions from 'src/utils/requestAndroidPermissions';
import { Platform } from 'react-native';

export function* geolocationFetchSaga(_: IGeolocationAction) {
  try {
    const granted = Platform.OS === 'android' ? yield call(requestAndroidPermissions) : true;
    if (granted) {
      const position: GeolocationResponse = yield call(getCurrentPosition);
      yield put(geolocationSet(position))
    } else {
      yield put(geolocationSetError('geolocation access not granted'))
    }
  } catch (e) {
    console.log('geolocationFetchSaga.error', e)
    yield put(geolocationSetError(e.message))
  }
}

export default function* geolocationSaga() {
  yield takeLatest(geolocationActionTypes.GEOLOCATION_FETCH, geolocationFetchSaga)
}
