import apisauce from 'src/utils/apisauce';
import { IForecastRequestParams, IForecastResponse } from 'src/utils/interfaces';

export const forecast = (params: IForecastRequestParams): Promise<IForecastResponse> => apisauce.get('/forecast', params)
