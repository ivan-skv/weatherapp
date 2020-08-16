import apisauce from './apisauce'
import { IForecastRequestParams, IForecastResponse } from './interfaces';

const getForecast = async (params: IForecastRequestParams): Promise<IForecastResponse> => apisauce.get('/forecast', params)

export default getForecast;
