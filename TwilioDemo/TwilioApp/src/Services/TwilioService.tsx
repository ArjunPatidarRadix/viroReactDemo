import {Channel, Client, Member, Message, User} from 'twilio-chat';

export interface IParsedChannel {
  id: string;
  name: string;
  createdAt: {};
  updatedAt: {};
  lastMessageTime: {};
  admin: string;
  type: string;
}

export interface IParsedMessage {
  _id: string;
  text: string;
  createdAt: {};
  user: {
    _id: string;
    name: string;
  };
  received: boolean;
}

export interface IParsedUser {
  name: string;
  online: boolean;
}

export class TwilioService {
  static serviceInstance;
  static chatClient;

  constructor() {}

  static getInstance() {
    if (!TwilioService.serviceInstance) {
      TwilioService.serviceInstance = new TwilioService();
    }
    return TwilioService.serviceInstance;
  }

  async getChatClient(twilioToken) {
    if (!TwilioService.chatClient && !twilioToken) {
      throw new Error('Twilio token is null or undefined');
    }
    if (!TwilioService.chatClient && twilioToken) {
      return Client.create(twilioToken).then(client => {
        client.on('connectionError', state => console.log('state :: ', state));
        TwilioService.chatClient = client;
        return TwilioService.chatClient;
      });
    }
    return Promise.resolve().then(() => TwilioService.chatClient);
  }

  clientShutdown() {
    TwilioService.chatClient?.shutdown();
    TwilioService.chatClient = null;
  }

  addTokenListener(getToken) {
    if (!TwilioService.chatClient) {
      throw new Error('Twilio client is null or undefined');
    }
    TwilioService.chatClient.on('tokenAboutToExpire', () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });

    TwilioService.chatClient.on('tokenExpired', () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });
    return TwilioService.chatClient;
  }

  parseChannels(channels: Channel[]) {
    return channels.map(this.parseChannel);
  }

  parseChannel(channel: Channel) {
    return {
      id: channel.sid,
      name: channel.friendlyName,
      createdAt: channel.dateCreated,
      updatedAt: channel.dateUpdated,
      lastMessageTime:
        channel.lastMessage?.dateCreated ??
        channel.dateUpdated ??
        channel.dateCreated,
      admin: channel.createdBy,
      type: channel.type,
    };
  }

  parseMessages(messages: Message[]) {
    return messages.map(this.parseMessage).reverse();
  }

  parseMessage(message: Message) {
    return {
      _id: message.sid,
      text: message.body,
      createdAt: message.dateCreated,
      user: {
        _id: message.author,
        name: message.author,
      },
      received: true,
    };
  }

  parseMembers(members: Member[]) {
    return members.map(this.parseMember);
  }

  parseMember(member: Member) {
    return {
      name: member.state.identity,
    };
  }

  parseUser(user: User) {
    return {
      name: user.identity,
      online: user.online,
    };
  }
}
