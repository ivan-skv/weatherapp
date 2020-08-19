import React from 'react'
import {
  SafeAreaView, FlatList, RefreshControl, StyleProp, ViewStyle, Alert, Platform,
} from 'react-native'
import { CityInput, Header, StatusBar, ScreenWrapper, ForecastCard } from 'src/components'
import requestAndroidPermissions from 'src/utils/requestAndroidPermissions'
import getCurrentPosition from 'src/utils/getCurrentPosition'
import { GeolocationResponse } from '@react-native-community/geolocation'
import parseForecast from 'src/utils/parseForecast'
import { IForecastDetails } from 'src/components/ForecastCard/ForecastCardItem'
import { IWeatherState } from 'src/redux/weather/weatherInterfaces'
import * as weatherActions from 'src/redux/weather/weatherActions'

interface Props {
  weather: IWeatherState;
  weatherFetch: typeof weatherActions.weatherFetch;
}

interface State {
  refreshing: boolean;
  city?: string;
  data?: any[];
  error?: string;
  inputError?: string;
  position?: GeolocationResponse;
  defaultCity?: string;
}

class MainScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      refreshing: false,
      data: [],
      inputError: '',
    }
  }

  async componentDidMount() {
    const granted = Platform.OS === 'android' ? await requestAndroidPermissions() : true;
    if (!granted) {
      Alert.alert('Warning', 'Geolocation permissions not granted');
      return;
    }
    try {
      const position = await getCurrentPosition();
      this.setState({ position }, this.getForecast);
    } catch (e) {
      this.setState({ error: e.message || e.toString() })
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { weather } = this.props;
    if (prevProps.weather.isFetching && !weather.isFetching) {
      if (weather.error) {
        this.displayError()
      } else {
        this.setForecast()
      }
    }
  }

  private getForecast = () => {
    const { weather, weatherFetch } = this.props;
    const { city, position } = this.state;
    if (weather.isFetching) {
      return;
    }
    if (city) {
      weatherFetch({ q: city })
    } else if (position) {
      const { coords: { latitude, longitude } } = position;
      weatherFetch({ lat: latitude, lon: longitude });
    } else {
      this.setState({ inputError: 'City must not be empty' })
    }
  }

  private setForecast = () => {
    const { weather } = this.props;
    if (weather.data) {
      const { data } = weather
      const { city } = this.state;
      const cityName = data.city.name;
      if (!city || (city && cityName && city.toLowerCase() !== cityName.toLowerCase())) {
        this.setState({ defaultCity: cityName })
      }
      this.setState({
        data: parseForecast(data),
      })
    } else {
      this.setState({
        data: [],
      })
    }
  }

  private displayError = () => {
    const { weather } = this.props;
    const { error } = weather;
    if (error) {
      Alert.alert('Error', typeof error === 'string' ? error : error.message, [
        {
          text: 'Ok',
          onPress: () => this.setState({ error: '' }),
        },
      ])
    }
  }

  renderItem = ({ item }: { item: { date: string, data: IForecastDetails[] }; }) => {
    return <ForecastCard
      data={item.data}
      date={item.date}
    />
  }

  render() {
    const { weather } = this.props;
    const { city, data, inputError, defaultCity } = this.state
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
          onEndEditing={this.getForecast}
          onSearch={this.getForecast}
        />
        <FlatList
          data={data}
          contentContainerStyle={styles.list}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={<RefreshControl
            refreshing={weather.isFetching}
            onRefresh={this.getForecast}
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
