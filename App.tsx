import React from 'react';
import 'src/utils/mapToJson'
import 'src/utils/jsonParse'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Main } from 'src/screens';
import { store, persistor } from 'src/redux';

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
