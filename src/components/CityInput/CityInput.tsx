import React from 'react'
import { OutlinedTextField, TextFieldProps } from 'react-native-material-textfield'
import { BlurView } from '@react-native-community/blur'
import { View, StyleProp, ViewStyle, Image, ImageStyle, TouchableOpacity } from 'react-native';
import searchIcon from 'src/resources/images/search.png'

interface Props extends TextFieldProps {
  viewStyle?: StyleProp<ViewStyle>;
  onSearch?: () => void;
}

class CityInput extends React.Component<Props> {
  render() {
    const { containerStyle, inputContainerStyle, viewStyle, error, onSearch } = this.props;
    return <View style={[styles.view, viewStyle]}>
      <BlurView blurType="light" style={styles.blurView} />
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onSearch}
      >
        <Image
          source={searchIcon}
          resizeMode="contain"
          width={24}
          height={24}
          style={styles.icon}
        />
      </TouchableOpacity>
      <OutlinedTextField
        {...this.props}
        tintColor={'rgba(0, 0, 0, 0.55)'}
        activeLineWidth={1.5}
        containerStyle={[styles.containerStyle, containerStyle]}
        labelOffset={{ x0: 40, y0: 0, x1: 0, y1: -10 }}
        inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle, error ? styles.errorContainerStyle : null]}
        style={{ marginLeft: 40 }}
      />
    </View>
  }
}

const styles: {
  view: StyleProp<ViewStyle>;
  blurView: StyleProp<ViewStyle>;
  containerStyle: StyleProp<ViewStyle>;
  inputContainerStyle: StyleProp<ViewStyle>;
  errorContainerStyle: StyleProp<ViewStyle>;
  iconButton: StyleProp<ViewStyle>;
  icon: StyleProp<ImageStyle>;
} = {
  view: {
    position: 'relative',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  iconButton: {
    width: 24,
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 24,
    zIndex: 100,
  },
  icon: {
    width: 24,
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  containerStyle: {
    marginTop: 10,
    padding: 0,
  },
  errorContainerStyle: {
    marginBottom: 10,
  },
  inputContainerStyle: {},
}

export default CityInput;
