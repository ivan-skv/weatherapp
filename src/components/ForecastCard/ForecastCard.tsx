import React from 'react'
import { Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native'
import moment from 'moment'
// import { BlurView } from '@react-native-community/blur'
import ForecastCardItem, { IForecastDetails } from './ForecastCardItem';

interface Props {
  date: string;
  data: IForecastDetails[];
}

export default class Weather extends React.Component<Props> {
  private renderItem = (item: IForecastDetails, index: number) => {
    return <ForecastCardItem
      key={index}
      details={item}
      style={{ minWidth: '25%' }}
    />
  }

  render() {
    const { data, date } = this.props;
    return <View style={styles.view}>
      {/* <BlurView style={styles.blurView} blurType="light" /> */}
      <Text style={styles.date}>{moment.utc(date).format('dddd, MMMM DD, YYYY')}</Text>
      <View style={[styles.data, data.length < 4 ? { justifyContent: 'flex-end' } : null]}>
        {data.map(this.renderItem)}
      </View>
    </View>;
  }
}

const styles: {
  view: StyleProp<ViewStyle>;
  data: StyleProp<ViewStyle>;
  date: StyleProp<TextStyle>;
  blurView: StyleProp<ViewStyle>;
} = {
  view: {
    position: 'relative',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  data: {
    paddingTop: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  date: {
    textTransform: 'capitalize',
    fontSize: 22,
    textAlign: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
}
