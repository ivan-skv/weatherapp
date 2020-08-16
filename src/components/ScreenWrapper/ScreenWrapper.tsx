import React from 'react'
import { ImageBackground, StyleProp, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native'
import bgImage from '../../resources/images/background-mobile.png'

interface Props {
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  source?: ImageSourcePropType;
}

const ScreenWrapper: React.FC<Props> = (props) => {
  return <ImageBackground
    {...props}
    source={props.source || bgImage}
    style={[styles.viewStyle, props.style]}
    imageStyle={[styles.imageStyle, props.imageStyle]}
  >
    {props.children}
  </ImageBackground>
}

export default ScreenWrapper;

const styles: {
  viewStyle: StyleProp<ViewStyle>;
  imageStyle: StyleProp<ImageStyle>;
} = {
  viewStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    flex: 1,
  },
}
