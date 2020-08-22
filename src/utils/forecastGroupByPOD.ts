import { IForecast, PartOfDay } from 'src/api/interfaces';
import moment from 'moment'

export const getPartOfDay = (item: IForecast): PartOfDay => {
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

const forecastGroupByPOD = (data: IForecast[]) => {
  const groupedByPartOfDay = data.reduce((acc, cur) => {
    const pod = getPartOfDay(cur)
    const array = acc.get(pod)
    if (!array) {
      acc.set(pod, [{ ...cur, pod }])
    } else {
      array.push({ ...cur, pod })
    }
    return acc;
  }, new Map() as Map<PartOfDay, IForecast[]>)
  return groupedByPartOfDay;
}

export default forecastGroupByPOD;
