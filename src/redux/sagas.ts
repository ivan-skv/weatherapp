import weatherSaga from './weather/weatherSaga'
import geolocationSaga from './geolocation/geolocationSaga'

import { all } from 'redux-saga/effects'

export default function* sagas() {
  yield all([
    geolocationSaga(),
    weatherSaga(),
  ])
}
