import React from 'react';
import {
  CallContentView,
  CallControlsView,
} from '@stream-io/video-react-native-sdk';
import {SafeAreaView, StyleSheet} from 'react-native';
import {theme} from '@stream-io/video-react-native-sdk/src/theme';

export function ActiveCall() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <CallContentView />
      <CallControlsView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.light.static_grey,
  },
});
