import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {Chat, OverlayProvider, Streami18n} from 'stream-chat-react-native';
import {useChatClient} from '../hooks/useChatClient';
import {STREAM_API_KEY} from 'react-native-dotenv';
import {useStreamChatTheme} from '../hooks/useStreamChatTheme';
import {AuthProgressLoader} from './AuthProgressLoader';
import {StreamChatGenerics} from '../types';
import {createToken} from '../utils/createToken';
import {useAppContext} from '../context/AppContext';

const streamI18n = new Streami18n({
  language: 'en',
});

export const ChatWrapper = ({children}: PropsWithChildren<{}>) => {
  const {user} = useAppContext();

  const userData = useMemo(
    () => ({
      id: user?.id as string,
      name: user?.name,
      imageUrl: user?.image,
    }),
    [user],
  );

  const tokenProvider = useCallback(async () => {
    return await createToken({user_id: user?.id as string});
  }, [user?.id]);

  const chatClient = useChatClient({
    apiKey: STREAM_API_KEY,
    userData,
    tokenProvider,
  });
  const theme = useStreamChatTheme();

  if (!chatClient) {
    return <AuthProgressLoader />;
  }

  return (
    <OverlayProvider<StreamChatGenerics>
      i18nInstance={streamI18n}
      value={{style: theme}}>
      <Chat client={chatClient} i18nInstance={streamI18n}>
        {children}
      </Chat>
    </OverlayProvider>
  );
};
