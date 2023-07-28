import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import {STREAM_API_KEY} from 'react-native-dotenv';
import {useAppContext} from '../context/AppContext';
import {createToken} from '../utils/createToken';

export const VideoWrapper = ({children}: PropsWithChildren<{}>) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | undefined>(
    undefined,
  );
  const {user} = useAppContext();

  useEffect(() => {
    if (!user) {
      return;
    }
    const userToLogin = {
      id: user.id,
      name: user.name,
      image: user.image,
    };

    const _videoClient = new StreamVideoClient({
      apiKey: STREAM_API_KEY,
      user: userToLogin,
      tokenProvider: async () => createToken({user_id: user.id}),
    });

    setVideoClient(_videoClient);

    return () => {
      _videoClient.disconnectUser();
      setVideoClient(undefined);
    };
  }, [user]);

  if (!videoClient) {
    return null;
  }

  return (
    <StreamVideo client={videoClient} language={'en'}>
      {children}
    </StreamVideo>
  );
};
