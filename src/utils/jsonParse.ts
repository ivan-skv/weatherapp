import parseMap from './parseMap';

const JSONParse = JSON.parse;

JSON.parse = (text: string) => JSONParse(text, (_, value) => {
  if (typeof value === 'object' && value.__map) {
    return parseMap(value)
  }
  return value;
})
