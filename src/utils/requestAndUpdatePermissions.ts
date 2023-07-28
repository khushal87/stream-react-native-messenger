import {Platform} from 'react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {
  androidProcessPermissions,
  iosProcessPermissions,
} from './updatePermissions';

export const requestAndUpdatePermissions = async () => {
  if (Platform.OS === 'ios') {
    // Request camera and mic permissions on iOS
    const results = await requestMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MICROPHONE,
    ]);
    // Sync the permissions with the Stream Video SDK
    iosProcessPermissions(results);
  } else if (Platform.OS === 'android') {
    // Request camera and mic permissions on Android
    const results = await requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]);
    // Sync the permissions with the Stream Video SDK
    androidProcessPermissions(results);
  }
};
