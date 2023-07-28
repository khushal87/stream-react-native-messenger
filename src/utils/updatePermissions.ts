import {PERMISSIONS, RESULTS, PermissionStatus} from 'react-native-permissions';
import {StreamVideoRN} from '@stream-io/video-react-native-sdk';

export const androidProcessPermissions = (
  results: Record<
    'android.permission.CAMERA' | 'android.permission.RECORD_AUDIO',
    PermissionStatus
  >,
) =>
  StreamVideoRN.setPermissions({
    isCameraPermissionGranted:
      results[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED,
    isMicPermissionGranted:
      results[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED,
  });

export const iosProcessPermissions = (
  results: Record<
    'ios.permission.CAMERA' | 'ios.permission.MICROPHONE',
    PermissionStatus
  >,
) =>
  StreamVideoRN.setPermissions({
    isCameraPermissionGranted:
      results[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED,
    isMicPermissionGranted:
      results[PERMISSIONS.IOS.MICROPHONE] === RESULTS.GRANTED,
  });
