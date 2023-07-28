import {User as VideoUserType} from '@stream-io/video-react-native-sdk';

export type User = Omit<VideoUserType, 'id'> & {id: string};

export type LocalAttachmentType = Record<string, unknown>;
export type LocalChannelType = Record<string, unknown>;
export type LocalCommandType = string;
export type LocalEventType = Record<string, unknown>;
export type LocalMessageType = Record<string, unknown>;
export type LocalReactionType = Record<string, unknown>;
export type LocalUserType = Omit<VideoUserType, 'type'>;

export type StreamChatGenerics = {
  attachmentType: LocalAttachmentType;
  channelType: LocalChannelType;
  commandType: LocalCommandType;
  eventType: LocalEventType;
  messageType: LocalMessageType;
  reactionType: LocalReactionType;
  userType: LocalUserType;
};

export type NavigationStackParamsList = {
  ChannelListScreen: undefined;
  ChannelScreen: undefined;
  ThreadScreen: undefined;
};
