import { PermissionsAndroid } from 'react-native'

const requestAndroidPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Weather app Location Permission',
        message: 'Weather app needs access to your geolocation so you can get weather forecasts',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (e) {
    return false;
  }
}

export default requestAndroidPermissions;
