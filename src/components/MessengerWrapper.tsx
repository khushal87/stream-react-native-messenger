import React, {PropsWithChildren, useCallback, useEffect} from 'react';
import {
  CallingState,
  IncomingCallView,
  OutgoingCallView,
  StreamCall,
  theme,
  useCall,
  useCallCallingState,
  useCalls,
} from '@stream-io/video-react-native-sdk';

import {STREAM_API_KEY} from 'react-native-dotenv';
import {ChatWrapper} from './ChatWrapper';
import {VideoWrapper} from './VideoWrapper';
import {AuthProgressLoader} from './AuthProgressLoader';
import {Alert, StyleSheet, View} from 'react-native';
import {ActiveCall} from './ActiveCall';

console.log('STREAM_API_KEY', STREAM_API_KEY);

const CallPanel = () => {
  const call = useCall();
  const isCallCreatedByMe = call?.data?.created_by.id === call?.currentUserId;

  const callingState = useCallCallingState();

  switch (callingState) {
    case CallingState.RINGING:
      return isCallCreatedByMe ? (
        <View style={styles.container}>
          <OutgoingCallView />
        </View>
      ) : (
        <IncomingCallView />
      );
    case CallingState.JOINED:
      return (
        <View style={styles.container}>
          <ActiveCall />
        </View>
      );
    case CallingState.JOINING:
      return (
        <View style={styles.container}>
          <AuthProgressLoader />
        </View>
      );
    default:
      return null;
  }
};

export const Calls = () => {
  const calls = useCalls();

  const handleMoreCalls = useCallback(async () => {
    const lastCallCreatedBy = calls[1].data?.created_by;
    Alert.alert(
      `Incoming call from ${
        lastCallCreatedBy?.name ?? lastCallCreatedBy?.id
      }, only 1 call at a time is supported`,
    );
  }, [calls]);

  // Reset the state of the show variable when there are no calls.
  useEffect(() => {
    if (calls.length > 1) {
      handleMoreCalls();
    }
  }, [calls.length, handleMoreCalls]);

  const firstCall = calls[0];

  if (!firstCall) {
    return null;
  }

  return (
    <StreamCall call={firstCall}>
      <CallPanel />
    </StreamCall>
  );
};

export const MessengerWrapper = ({children}: PropsWithChildren<{}>) => {
  return (
    <ChatWrapper>
      <VideoWrapper>
        {children}
        <Calls />
      </VideoWrapper>
    </ChatWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.light.static_grey,
  },
});
