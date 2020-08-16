import { IForecastResponseDataSuccess, IForecast, PartOfDay, WeatherType } from './interfaces';
import moment from 'moment'
import 'moment/locale/ru'
import { IForecastDetails } from 'src/components/ForecastCard/ForecastCardItem';

type IGroupedByDayForecast = { [date: string]: IForecast[] };
type IGroupedByPartOfDayForecast = { [x in PartOfDay]: IForecast[] };

const getPartOfDay = (item: IForecast): PartOfDay => {
  const hours = moment.utc(item.dt * 1000).format('HH:mm');
  switch (hours) {
    case '03:00':
    case '06:00':
      return 'morning';
    case '09:00':
    case '12:00':
      return 'afternoon';
    case '15:00':
    case '18:00':
      return 'evening';
    default:
      return 'night';
  }
}

const sortedPartsOfDay: PartOfDay[] = ['morning', 'afternoon', 'evening', 'night']

const parseForecast = (data: IForecastResponseDataSuccess) => {
  const sortedDates: string[] = [];
  const groupedByDay = data.list.reduce((acc, cur) => {
    const date = moment.utc(cur.dt * 1000).format('YYYY-MM-DD');
    console.log(cur.dt_txt, date)
    if (sortedDates.indexOf(date) === -1) {
      sortedDates.push(date)
    }
    acc[date] = Array.isArray(acc[date]) ? acc[date] : [];
    acc[date].push(cur)
    return acc;
  }, {} as IGroupedByDayForecast)
  console.log('parseForecast.dates: ', sortedDates)
  console.log('parseForecast.groupedByDay: ', groupedByDay)
  const result = sortedDates.reduce((res, date) => {
    const list = groupedByDay[date];
    const groupedByPartOfDay = list.reduce((acc, cur) => {
      const partOfDay = getPartOfDay(cur);
      acc[partOfDay] = Array.isArray(acc[partOfDay]) ? acc[partOfDay] : [];
      acc[partOfDay].push(cur);
      return acc;
    }, {} as IGroupedByPartOfDayForecast)
    console.log('parseForecast[' + date + '].groupedByPartOfDay', groupedByPartOfDay)
    const sortedKeys = Object.keys(groupedByPartOfDay).sort((a, b) => sortedPartsOfDay.indexOf(a as PartOfDay) - sortedPartsOfDay.indexOf(b as PartOfDay));
    const forecast = sortedKeys.reduce((acc, key) => {
      const array = groupedByPartOfDay[key as PartOfDay]
      const temperature = array.reduce((temp, item) => (item.main.temp + temp), 0) / array.length;
      const item = acc[key as PartOfDay] = {
        title: key as PartOfDay,
        temperature,
        weather: array[0].weather[0].main.toLowerCase() as WeatherType,
        icon: array[0].weather[0].icon,
        date,
      }
      if (item.title === 'morning' || item.title === 'afternoon') {
        item.icon = item.icon.replace('n', 'd');
      } else {
        item.icon = item.icon.replace('d', 'n');
      }
      return acc;
    }, {} as { [x in PartOfDay]: IForecastDetails })
    console.log('parseForecast[' + date + '].forecast', forecast)
    res.push({
      date,
      data: sortedKeys.map(key => forecast[key as PartOfDay]),
    })
    return res;
  }, [] as Array<{
    date: string;
    data: IForecastDetails[];
  }>);
  console.log('parseForecast.result', result)
  return result;
}

export default parseForecast;
