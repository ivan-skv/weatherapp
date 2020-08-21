import { connect } from 'react-redux'
import MainScreen from './Main.screen'
import { IStore } from 'src/redux/interfaces'
import { weatherFetch } from 'src/redux/weather/weatherActions'
import { citySet } from 'src/redux/city/cityActions'

export default connect(
  (state: IStore) => ({
    weather: state.weather,
    city: state.city,
  }),
  {
    weatherFetch,
    citySet,
  }
)(MainScreen)
