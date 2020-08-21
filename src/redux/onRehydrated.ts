import { Store } from 'redux'

const onRehydrated = <T>(store: Store<T>) => {
  store.getState()
}

export default onRehydrated;
