import React from 'react'
import { Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const Header: React.FC<Props> = (props) => {
  const { title } = props;
  return <LinearGradient
    style={[styles.view, props.style]}
    colors={['#feb301', '#7d1ce8']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <Text style={styles.text}>{title}</Text>
  </LinearGradient>
}

export default Header;

const styles: {
  view: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
} = {
  view: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 20,
    fontSize: 20,
  },
}
