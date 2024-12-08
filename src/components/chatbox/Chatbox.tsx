import { Affix, Popover } from '@mantine/core';
import BaseButton from '../base/button';
import {
  Avatar,
  ChatContainer,
  Conversation,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  MessageModel,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';
import { chatAi } from '@/services/chat.service';
export default function Chatbox() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const handleSend = async (message: string) => {
    const newMsg = {
      message,
      sender: 'user',
      direction: 'outgoing',
      position: 'single',
    } as MessageModel;
    setMessages(msg => [...msg, newMsg]);
    setTyping(true);
    const response: any = await chatAi({ prompt: 'message' });
    setMessages(msg => [
      ...msg,
      { message: response.data.text, sender: 'admin', direction: 'incoming', position: 'last' },
    ]);
    setTyping(false);
  };
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Popover
          onOpen={() =>
            messages.length
              ? ''
              : setMessages(msg => [
                  ...msg,
                  {
                    message: 'Xin Chào Tôi Có Thể Giúp Gì Cho Bạn!',
                    sender: 'admin',
                    direction: 'incoming',
                    position: 'first',
                  },
                ])
          }
        >
          <Popover.Target>
            <BaseButton>Chat With Ai</BaseButton>
          </Popover.Target>
          <Popover.Dropdown w={500} className="p-0 border-none">
            <Conversation name="Admin">
              <Avatar
                name="admin"
                src="https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg"
              />
            </Conversation>
            <MainContainer>
              <ChatContainer>
                <MessageList typingIndicator={typing ? <TypingIndicator content="chatbot in typing..." /> : null}>
                  {messages.map((message, index) => {
                    return <Message key={index} model={message} />;
                  })}
                </MessageList>
                <MessageInput placeholder="Type something..." onSend={handleSend} />
              </ChatContainer>
            </MainContainer>
          </Popover.Dropdown>
        </Popover>
      </Affix>
    </>
  );
}
