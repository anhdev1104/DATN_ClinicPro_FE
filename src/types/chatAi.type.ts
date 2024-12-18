export interface IListConversation {
  id: string;
  user_id: string;
  title: string;
  created_at?: string;
  updated_at?: string;
}

export interface IMessage {
  id: number;
  conversation_id: string;
  sender_type: 'USER' | 'AI';
  message_text: string;
  created_at: string;
  updated_at: string;
  typeMessage?: string;
}

export interface IConversation extends IListConversation {
  messages: IMessage[];
}

export interface INewMessage {
  prompt: string;
  id?: string;
}
