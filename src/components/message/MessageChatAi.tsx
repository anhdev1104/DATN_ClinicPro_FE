import { IMessage } from '@/types/chatAi.type';
import Typewriter from 'typewriter-effect';
import { useRef } from 'react';

const MessageAi = ({ message, setProgressMessage }: { message: IMessage; setProgressMessage: any }) => {
  const isUser = message.sender_type === 'USER';
  const typewriterRef = useRef<any>(null);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-[#4db6ac] mr-3 flex-shrink-0 flex items-center justify-center">
          <img src="/images/chat-ai-img.png" className="rounded-full" alt="" />
        </div>
      )}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser ? 'bg-[#4db6ac] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
          } shadow-sm`}
        >
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {message.typeMessage === 'responseAi' ? (
              <Typewriter
                options={{
                  delay: 1, // Tăng tốc độ nhanh nhất
                  cursor: '',
                }}
                onInit={typewriter => {
                  typewriterRef.current = typewriter;

                  typewriter
                    .typeString(message.message_text)
                    .callFunction(() => {
                      setProgressMessage(false);
                    })
                    .start();

                  setProgressMessage(true);
                }}
              />
            ) : (
              message.message_text
            )}
          </p>
        </div>
        <span className="text-xs text-gray-400 mt-1">
          {new Date(message.created_at).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageAi;
