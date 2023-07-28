import {Platform} from 'react-native';
import {PERMISSIONS, checkMultiple} from 'react-native-permissions';
import {
  androidProcessPermissions,
  iosProcessPermissions,
} from './updatePermissions';

export const checkAndUpdatePermissions = async () => {
  if (Platform.OS === 'ios') {
    // Check, update and sync permissions on iOS
    const results = await checkMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MICROPHONE,
    ]);
    // Sync the permissions with the Stream Video SDK
    iosProcessPermissions(results);
  } else if (Platform.OS === 'android') {
    // Check, update and sync permissions on Android
    const results = await checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]);
    // Sync the permissions with the Stream Video SDK
    androidProcessPermissions(results);
  }
};
