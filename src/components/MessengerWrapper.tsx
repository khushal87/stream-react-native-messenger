import React, {PropsWithChildren, useCallback, useEffect} from 'react';
import {
  RingingCallContent,
  StreamCall,
  useCalls,
} from '@stream-io/video-react-native-sdk';

import {STREAM_API_KEY} from 'react-native-dotenv';
import {ChatWrapper} from './ChatWrapper';
import {VideoWrapper} from './VideoWrapper';
import {Alert, StyleSheet} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

console.log('STREAM_API_KEY', STREAM_API_KEY);

export const Calls = () => {
  const calls = useCalls();
  const {top} = useSafeAreaInsets();

  const handleMoreCalls = useCallback(async () => {
    const lastCallCreatedBy = calls[1].state?.createdBy;
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
      <SafeAreaView style={[styles.container, {top}]}>
        <RingingCallContent />
      </SafeAreaView>
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
  },
});
