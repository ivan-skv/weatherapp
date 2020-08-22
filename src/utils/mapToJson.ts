import serializeMap from './serializeMap';

declare global {
  interface Map<K, V> {
    toJSON: () => string;
    toArray: () => { key: K; val: V; }[];
  }
}

// eslint-disable-next-line no-extend-native
Object.defineProperties(Map.prototype, {
  toJSON: {
    value: function () {
      return serializeMap(this);
    },
    configurable: true,
  },
  toArray: {
    value: function () {
      return Array.prototype.slice.call(this.keys())
        .map((key) => ({ key: key, val: this.get(key) }))
    },
    configurable: true,
  },
})
