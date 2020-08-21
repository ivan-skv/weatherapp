import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import { composeWithDevTools } from 'redux-devtools-extension'

import weatherSaga from './weather/weatherSaga'
import eventEmitter from 'src/utils/eventEmitter'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(
  weatherSaga,
)

const persistor = persistStore(store, null, () => {
  eventEmitter.emit('persist/BOOTSTRAP', store.getState())
})

// persistor.purge()

export { store, persistor }

