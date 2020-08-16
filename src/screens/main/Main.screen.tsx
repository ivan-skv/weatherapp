import React from 'react'
import {
  SafeAreaView, FlatList, RefreshControl, StyleProp, ViewStyle, Alert, Platform,
} from 'react-native'
import { CityInput, Header, StatusBar, ScreenWrapper, ForecastCard } from 'src/components'
import getForecast from 'src/utils/getForecast'
import { IForecastResponse, IForecastResponseDataSuccess, IForecastResponseDataError } from 'src/utils/interfaces'
import requestAndroidPermissions from 'src/utils/requestAndroidPermissions'
import getCurrentPosition from 'src/utils/getCurrentPosition'
import { GeolocationResponse } from '@react-native-community/geolocation'
import parseForecast from 'src/utils/parseForecast'
import { IForecastDetails } from 'src/components/ForecastCard/ForecastCardItem'

interface Props { }
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
      console.log('position: ', position)
      this.setState({ position }, this.getForecast);
    } catch (e) {
      this.setState({ error: e.message || e.toString() })
    }
  }

  private getForecast = () => {
    const { city, refreshing, position } = this.state;
    console.warn('city: ', city)
    if (refreshing) {
      console.warn('warning: get forecast not started', { city, refreshing })
      return;
    }
    if (city) {
      this.setState({ refreshing: true, error: '' }, async () => {
        const response = await getForecast({ q: city });
        this.setForecast(response)
      })
    } else if (position) {
      this.setState({ refreshing: true, error: '' }, async () => {
        const { coords: { latitude, longitude } } = position;
        const response = await getForecast({ lat: latitude, lon: longitude });
        this.setForecast(response)
      })
    } else {
      this.setState({ inputError: 'City must not be empty' })
    }
  }

  private setForecast = (response: IForecastResponse) => {
    const { ok } = response;
    console.log('forecast response: ', response.data);
    if (ok && response.data) {
      const data = response.data as IForecastResponseDataSuccess;
      console.log('forecast: ', data);
      const { city } = this.state;
      const cityName = data.city.name;
      if (!city || (city && cityName && city.toLowerCase() !== cityName.toLowerCase())) {
        this.setState({ defaultCity: cityName })
      }
      this.setState({
        data: parseForecast(data),
        refreshing: false,
      })
    } else if (!ok && response.data) {
      const data = response.data as IForecastResponseDataError;
      this.setState({
        error: data.message,
        data: [],
        refreshing: false,
      }, this.displayError)
    } else {
      this.setState({
        error: `unknown error: status code ${response.status}`,
        refreshing: false,
        data: [],
      }, this.displayError)
    }
  }

  private displayError = () => {
    const { error } = this.state;
    if (error) {
      Alert.alert('Error', error, [
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
    const { refreshing, city, data, inputError, defaultCity } = this.state
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
            refreshing={refreshing}
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
