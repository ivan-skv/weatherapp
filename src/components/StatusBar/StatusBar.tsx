import React from 'react'
import { StatusBar as RNStatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
  height?: number;
}

const StatusBarAndroid23: React.FC<Props> = (props) => {
  return <LinearGradient
    style={{ height: props.height || 20 }}
    colors={['#feb301', '#7d1ce8']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <RNStatusBar translucent barStyle="dark-content" backgroundColor={'rgba(0, 0, 0, 0.2)'} />
  </LinearGradient>
}

// const StatusBarIOSAndroid: React.FC = () => {
//   return null;
// }
export default StatusBarAndroid23;
