import { IForecast, WeatherType, PartOfDay } from 'src/api/interfaces';
import { IForecastSummary } from 'src/api/interfaces';

const forecastSummary = (data: IForecast[], pod?: PartOfDay): IForecastSummary | null => {
  if (!data.length) { return null; }
  const temperature = data.reduce((acc, cur) => {
    return cur.main.temp + acc;
  }, 0) / data.length;
  const res = {
    title: pod,
    temperature,
    weather: data[0].weather[0].main.toLowerCase() as WeatherType,
    icon: data[0].weather[0].icon,
  }
  if (pod === 'morning' || pod === 'afternoon') {
    res.icon = res.icon.replace('n', 'd')
  } else {
    res.icon = res.icon.replace('d', 'n')
  }
  return res;
}

export default forecastSummary;
