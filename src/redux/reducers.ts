import { combineReducers } from 'redux'
import { persistReducer, PersistConfig, createTransform } from 'redux-persist'
import storage from '@react-native-community/async-storage'

import weatherReducer from './weather/weatherReducer'
import cityReducer from './city/cityReducer'

const persistTransform = createTransform(
  (inboundState, _) => {
    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'isFetching') {
      return false;
    }
    if (key === 'error') {
      return '';
    }
    return outboundState;
  }
)

const createPersistConfig = <T>(key: string): PersistConfig<T> => ({
  key,
  storage,
  transforms: [persistTransform],
})

const reducers = combineReducers({
  weather: persistReducer(
    createPersistConfig('weather'),
    weatherReducer,
  ),
  city: persistReducer(
    createPersistConfig('city'),
    cityReducer,
  ),
})

export default reducers;
