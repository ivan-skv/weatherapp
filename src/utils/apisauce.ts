import { create } from 'apisauce'
import config from 'src/config'

const apisauce = create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
})

apisauce.addRequestTransform((request) => {
  const params = Object.assign({}, request.params);
  params.appid = config.apiKey
  params.units = 'metric';
  request.params = params;
})

export default apisauce;
