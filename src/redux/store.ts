import {
  createStore, combineReducers, applyMiddleware,
} from 'redux'
import { persistReducer, persistStore, PersistConfig, createTransform } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import storage from '@react-native-community/async-storage'

import weatherReducer from './weather/weatherReducer'
import weatherSaga from './weather/weatherSaga'
import eventEmitter from 'src/utils/eventEmitter'

const sagaMiddleware = createSagaMiddleware()

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

const mainReducer = combineReducers({
  weather: persistReducer(
    createPersistConfig('weather'),
    weatherReducer
  ),
})

const store = createStore(
  mainReducer,
  applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(
  weatherSaga,
)

const persistor = persistStore(store, null, () => {
  eventEmitter.emit('persist/BOOTSTRAP', store.getState())
})

// persistor.purge()

export { store, persistor }

