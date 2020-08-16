import React from 'react'
import { StatusBar as RNStatusBar, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
  height?: number;
}

const StatusBar: React.FC<Props> = (props) => {
  const height = Platform.OS === 'ios' ? 0 : (props.height || 20);
  return <LinearGradient
    style={{ height }}
    colors={['#feb301', '#7d1ce8']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <RNStatusBar translucent barStyle="dark-content" backgroundColor={'rgba(0, 0, 0, 0.2)'} />
  </LinearGradient>
}

export default StatusBar;
