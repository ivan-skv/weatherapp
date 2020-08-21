import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'
import sagas from './sagas'
import onRehydrated from './onRehydrated'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(
  sagas,
)

const persistor = persistStore(store, null, () => {
  onRehydrated(store)
})

export { store, persistor }

