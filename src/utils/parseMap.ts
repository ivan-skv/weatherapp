
const parseMap = <K, V>(data: { __map: true, keys: Array<K>, values: Array<V> }): Map<K, V> => {
  const keys: Array<K> = data.keys;
  const values: Array<V> = data.values;
  return keys.reduce((acc, key, idx) => {
    acc.set(key, values[idx])
    return acc;
  }, new Map() as Map<K, V>)
}

export default parseMap;
