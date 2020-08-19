import { connect } from 'react-redux'
import MainScreen from './Main.screen'
import { IStore } from 'src/redux/interfaces'
import { weatherFetch } from 'src/redux/weather/weatherActions'

export default connect(
  (state: IStore) => ({
    weather: state.weather,
  }),
  {
    weatherFetch,
  }
)(MainScreen)
