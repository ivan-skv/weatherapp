import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Main } from 'src/screens';
import { store, persistor } from 'src/redux';
import eventEmitter from 'src/utils/eventEmitter';

eventEmitter.addListener('persist/BOOTSTRAP', (data) => {
  console.log('bootstrap', data)
})

const App: React.FC = () => {
  return (
    <Provider
      store={store}
    >
      <PersistGate
        persistor={persistor}
        loading={null}
      >
        <Main />
      </PersistGate>
    </Provider>
  )
}

export default App;
