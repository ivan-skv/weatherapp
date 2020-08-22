import React from 'react'
import { View, Text, Image, StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { IForecastSummary } from 'src/api/interfaces';

interface Props {
  details: IForecastSummary;
  style?: StyleProp<ViewStyle>;
}

const ForecastCardItem: React.FC<Props> = (props) => {
  const { details, style } = props;
  const { title, temperature, weather, icon } = details;
  const uri = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return <View style={[styles.container, style]}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.temperature}>{`${temperature.toFixed(0)}\u00b0C`}</Text>
    <Text style={styles.weather}>{weather}</Text>
    <Image
      style={styles.icon}
      source={{ uri, width: 40, height: 40 }}
      resizeMode="contain"
      width={40}
      height={40}
    />
  </View>;
}

const styles: {
  container: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
  temperature: StyleProp<TextStyle>;
  weather: StyleProp<TextStyle>;
  icon: StyleProp<ImageStyle>;
} = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textTransform: 'capitalize',
  },
  temperature: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  weather: {
    textTransform: 'capitalize',
  },
  icon: {},
}

export default ForecastCardItem;
