const serializeMap = <K, V>(data: Map<K, V>): string => {
  return JSON.stringify({
    __map: true,
    keys: [...data.keys()],
    values: [...data.values()],
  });
}

export default serializeMap;
