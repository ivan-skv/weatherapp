import { ApiResponse } from 'apisauce';

export type IForecastResponse = ApiResponse<IForecastResponseDataSuccess, IForecastResponseDataError>;
export type IForecastRequestParams = IForecastRequestParamsCity | IForecastRequestParamsPosition;

export interface IForecastResponseDataError {
  message: string;
  cod: string;
}

export interface IForecastResponseDataSuccess {
  cod: string;
  message: number;
  cnt: number;
  list: ReadonlyArray<IForecast>;
  city: ICity;
}

export type PartOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type WeatherType = 'rain' | 'clouds' | 'clear' | 'thumderstorm' | 'drizzle' | 'snow' | 'mist' | 'smoke' | 'haze' | 'dust' | 'fog' | 'sand' | 'ash' | 'squall' | 'tornado';

export interface IForecastRequestParamsCity {
  q: string;
}

export interface IForecastRequestParamsPosition {
  lon: number | string;
  lat: number | string;
}

export interface IForecast {
  dt: number;
  main: IForecastMain;
  weather: ReadonlyArray<IForecastWeather>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: 'd' | 'n';
  };
  dt_txt: string;
}

export interface IForecastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface IForecastWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ICity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}
