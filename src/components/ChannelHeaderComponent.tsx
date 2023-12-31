import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Call} from '../icons/Call';
import {useAppContext} from '../context/AppContext';
import {Back} from '../icons/Back';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {
  MemberRequest,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import {randomId} from '../utils/randomId';

type ChannelHeaderProps = NativeStackHeaderProps;

export const ChannelHeader = (props: ChannelHeaderProps) => {
  const {navigation} = props;
  const {channel} = useAppContext();
  const videoClient = useStreamVideoClient();
  const members = Object.values(
    channel?.state?.members ?? {},
  ).map<MemberRequest>(member => ({
    user_id: member.user_id!,
  }));

  const joinCallHandler = useCallback(async () => {
    try {
      const call = videoClient?.call('default', randomId());
      await call?.getOrCreate({
        ring: true,
        data: {
          // more timeout to cancel the call automatically so that it works when callee's app is in quit state
          settings_override: {ring: {auto_cancel_timeout_ms: 60000}},
          custom: {channelCid: channel?.cid},
          members: members,
        },
      });
    } catch (error) {
      console.log('Failed to createCall', error);
    }
  }, [videoClient, members, channel?.cid]);

  const goBackHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.header}>
      <Pressable onPress={goBackHandler} style={styles.icon}>
        <Back color="#000" />
      </Pressable>
      <Text style={styles.name}>
        {channel?.data?.name ??
          channel?.state.members[members[1].user_id].user?.name}
      </Text>
      <Pressable onPress={joinCallHandler} style={styles.icon}>
        <Call color="#000" />
      </Pressable>
    </View>
  );
};

export function ChannelHeaderComponent(props: NativeStackHeaderProps) {
  return <ChannelHeader {...props} />;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    height: 18,
    width: 18,
  },
});
