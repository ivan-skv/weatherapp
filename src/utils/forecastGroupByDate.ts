import { IForecastResponseDataSuccess, IForecast } from 'src/api/interfaces';
import moment from 'moment'

const forecastGroupByDate = (data: IForecastResponseDataSuccess) => {
  const groupedByDate = data.list.reduce((acc, cur) => {
    const date = moment.utc(cur.dt * 1000).format('YYYY-MM-DD');
    const array = acc.get(date)
    if (!array) {
      acc.set(date, [{ ...cur, date }])
    } else {
      array.push({ ...cur, date })
    }
    return acc;
  }, new Map() as Map<string, IForecast[]>)
  return groupedByDate;
}

export default forecastGroupByDate;
