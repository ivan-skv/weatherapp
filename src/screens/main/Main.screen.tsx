import React from 'react'
import {
  SafeAreaView, FlatList, RefreshControl, StyleProp, ViewStyle, Alert, Platform,
} from 'react-native'
import { CityInput, Header, StatusBar, ScreenWrapper, ForecastCard } from 'src/components'
import { IWeatherState } from 'src/redux/weather/weatherInterfaces'
import * as weatherActions from 'src/redux/weather/weatherActions'
import * as cityActions from 'src/redux/city/cityActions'
import * as geolocationActions from 'src/redux/geolocation/geolocationActions'
import { ICityState } from 'src/redux/city/cityInterfaces'
import { IGeolocationState } from 'src/redux/geolocation/geolocationIntefaces'
import { IForecastGrouped } from 'src/api/interfaces'

interface Props {
  weather: IWeatherState;
  city: ICityState;
  geolocation: IGeolocationState;
  weatherFetch: typeof weatherActions.weatherFetch;
  citySet: typeof cityActions.citySet;
  geolocationFetch: typeof geolocationActions.geolocationFetch;
}

interface State {
  data?: any[];
  inputError?: string;
  city?: string;
  defaultCity?: string;
}

class MainScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputError: '',
      city: props.city.name || undefined,
    }
  }

  componentDidMount() {
    const { geolocationFetch } = this.props;
    geolocationFetch()
  }

  componentDidUpdate(prevProps: Props) {
    const { weather, geolocation } = this.props;
    if (prevProps.weather.isFetching && !weather.isFetching) {
      if (weather.error) {
        this.displayWeatherError()
      } else {
        this.updateDefaultCity()
      }
    }
    if (prevProps.geolocation.isFetching && !geolocation.isFetching) {
      if (geolocation.error) {
        this.displayGeolocationError()
      }
      this.forecastFetch()
    }
  }

  private forecastFetch = () => {
    const { weather, weatherFetch, citySet, geolocation } = this.props;
    if (weather.isFetching) {
      return;
    }
    const { data: position } = geolocation;
    const { city } = this.state;
    if (city) {
      weatherFetch({ q: city })
      citySet({ name: city })
      console.warn('city name', city)
    } else if (position) {
      const { coords: { latitude, longitude } } = position;
      weatherFetch({ lat: latitude, lon: longitude });
      console.warn('coordinates', latitude, longitude)
    } else {
      this.setState({ inputError: 'City must not be empty' })
    }
  }

  private updateDefaultCity = () => {
    const { weather } = this.props;
    if (weather.forecast.raw) {
      const { forecast: { raw: data } } = weather
      const { city } = this.state;
      const cityName = data.city.name;
      if (!city || (city && cityName && city.toLowerCase() !== cityName.toLowerCase())) {
        this.setState({ defaultCity: cityName })
      }
    }
    this.setState({ inputError: '' })
  }

  private displayWeatherError = () => {
    const { weather } = this.props;
    if (weather.error) {
      Alert.alert(
        'Error',
        typeof weather.error === 'string' ? weather.error : weather.error.message,
        [{
          text: 'Ok',
        }]
      )
    }
  }

  private displayGeolocationError = () => {
    const { geolocation } = this.props;
    if (geolocation.error) {
      Alert.alert(
        'Warning',
        geolocation.error,
        [{
          text: 'Ok',
        }]
      )
    }
  }

  renderItem = ({ item, index }: { item: IForecastGrouped; index: number; }) => {
    const { weather } = this.props;
    return <ForecastCard
      date={item.date}
      data={item.summary}
      last={weather.forecast.byDate?.length == (index + 1)}
      onPress={() => console.warn('forecast ', item.date, JSON.stringify(item))}
    />
  }

  render() {
    const { weather } = this.props;
    const { city, inputError, defaultCity } = this.state
    return <SafeAreaView style={styles.safeAreaView}>
      <StatusBar />
      <ScreenWrapper style={styles.container}>
        <Header title="Weather App" />
        <CityInput
          value={city}
          defaultValue={defaultCity}
          containerStyle={{ marginHorizontal: 10 }}
          onChangeText={(text) => {
            this.setState({ city: text, inputError: '' })
          }}
          error={inputError}
          label="Select city"
          onEndEditing={this.forecastFetch}
          onSearch={this.forecastFetch}
        />
        <FlatList
          data={weather.forecast.byDate}
          contentContainerStyle={styles.list}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={<RefreshControl
            refreshing={weather.isFetching}
            onRefresh={this.forecastFetch}
          />}
        />
      </ScreenWrapper>
    </SafeAreaView>;
  }
}


const styles: {
  safeAreaView: StyleProp<ViewStyle>;
  container: StyleProp<ViewStyle>;
  list: StyleProp<ViewStyle>;
} = {
  safeAreaView: {
    flex: 1,
  },
  container: {
    top: Platform.OS === 'ios' ? -20 : undefined,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  list: {
    paddingHorizontal: 10,
  },
}

export default MainScreen
