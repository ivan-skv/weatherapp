import React from 'react'
import { Text, View, StyleProp, ViewStyle, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import moment from 'moment'
// import { BlurView } from '@react-native-community/blur'
import ForecastCardItem from './ForecastCardItem';
import { IForecastSummary, PartOfDay } from 'src/api/interfaces';

interface Props extends TouchableOpacityProps {
  date: string;
  data: { [x in PartOfDay]: IForecastSummary };
  last?: boolean;
}

const pods: PartOfDay[] = ['morning', 'afternoon', 'evening', 'night']

export default class Weather extends React.Component<Props> {
  private renderItem = (key: PartOfDay, index: number) => {
    const { data } = this.props;
    return <ForecastCardItem
      key={index}
      details={data[key]}
      style={{ minWidth: '25%' }}
    />
  }

  render() {
    const { data, date, style, last, ...restProps } = this.props;
    const keys = Object.keys(data)
    const sortedKeys = pods.filter(key => keys.includes(key))
    return <TouchableOpacity
      {...restProps}
      style={[styles.view, style]}
    >
      {/* <BlurView style={styles.blurView} blurType="light" /> */}
      <Text style={styles.date}>{moment.utc(date).format('dddd, MMMM DD, YYYY')}</Text>
      <View style={[styles.data, keys.length < 4 ? { justifyContent: (last ? 'flex-start' : 'flex-end') } : null]}>
        {data && sortedKeys.map(this.renderItem)}
      </View>
    </TouchableOpacity>;
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
    backgroundColor: 'rgba(200, 200, 200, 0.4)',
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
