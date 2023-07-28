import {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {requestAndUpdatePermissions} from '../utils/requestAndUpdatePermissions';
import {checkAndUpdatePermissions} from '../utils/checkAndUpdatePermissions';

export const useSyncPermissions = () => {
  // request permissions on mount
  useEffect(() => {
    const requestAndUpdate = async () => {
      await requestAndUpdatePermissions();
    };
    requestAndUpdate();
  }, []);

  // check permissions on foreground
  const appStateRef = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkAndUpdatePermissions();
      }

      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
};
