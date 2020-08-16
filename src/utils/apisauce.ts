import { create } from 'apisauce'

const apisauce = create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
})

apisauce.addRequestTransform((request) => {
  const params = Object.assign({}, request.params);
  params.appid = 'fc5d1fc95f19a90681f3ec5c2bb71245'
  params.units = 'metric';
  request.params = params;
})

export default apisauce;
