import { IForecastResponseDataSuccess, PartOfDay, IForecastSummary, IForecastGrouped, IForecastGroupedMap } from 'src/api/interfaces';
import forecastGroupByDate from './forecastGroupByDate';
import forecastGroupByPOD from './forecastGroupByPOD';
import forecastSummary from './forecastSummary';

const toArray = <K, V>(data: Map<K, V>) => [...data.values()]

const toObject = <K extends string, V>(data: Map<K, V>) => [...data.keys()].reduce((acc, key) => {
  acc[key] = data.get(key) as V;
  return acc;
}, {} as { [x in K]: V })

const forecastParse = (data: IForecastResponseDataSuccess): IForecastGrouped[] => {
  const grouped = new Map<string, IForecastGroupedMap>()
  const groupedByDate = forecastGroupByDate(data)
  for (const [date, list] of groupedByDate.entries()) {
    const groupedByPod = forecastGroupByPOD(list)
    const summary = new Map<PartOfDay, IForecastSummary>();
    for (const [pod, value] of groupedByPod.entries()) {
      summary.set(pod, forecastSummary(value, pod) as IForecastSummary)
    }
    grouped.set(date, {
      date,
      list: list,
      pod: groupedByPod,
      summary: summary,
    })
  }
  return toArray(grouped).map((val) => ({
    ...val,
    pod: toObject(val.pod),
    summary: toObject(val.summary),
  }))
}

export default forecastParse;
