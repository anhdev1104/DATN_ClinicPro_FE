import { AddIcon, ChatIcon, DeleteIcon, DescriptionIcon, LocalHospitalIcon, SendIcon } from '@/components/icons';
import { MessageAi } from '@/components/message';
import { ModalConfirm } from '@/components/modal';
import convertTime from '@/helpers/convertTime';
import { RootState } from '@/redux/store';
import {
  deleteConversation,
  getDetailConversation,
  getListConversation,
  sendMessageConversation,
} from '@/services/chat.service';
import { IConversation, IListConversation } from '@/types/chatAi.type';
import { IUser } from '@/types/user.type';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import LoadingMessage from './component/LoadingMessage';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SortArrayToTimeStamp from '@/helpers/sortArrayToTimeStamp';

const schema = yup.object({
  prompt: yup.string().trim().required('Nội dung tin nhắn không được bỏ trống!'),
  id: yup.string(),
});

const ChatBoxPage = () => {
  const auth = useSelector((state: RootState | null) => {
    if (state && state.auth && state.auth.data) {
      return state.auth.data;
    }
    return null;
  }) as IUser;
  const [userId, setUserId] = useState<string | null>(null);
  const [listConversation, setListConversation] = useState<IListConversation[]>([]);
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [conversationDetail, setConversationDetail] = useState<IConversation>({} as IConversation);
  const [previousConversationId, setPreviousConversationId] = useState('');
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [LoadingMessageAI, setLoadingMessageAI] = useState<any>(null);

  useEffect(() => {
    if (auth) {
      if (auth.access_token && auth.access_token.length > 0) {
        setUserId(auth.data.id);
      }
    }
  }, [auth]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [conversationDetail.messages, setConversationDetail, setLoadingMessageAI]);

  const {
    control,
    handleSubmit,
    reset,
    // formState: { isSubmitting, errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      prompt: '',
    },
  });

  // lấy list phiên trò chuyện
  useEffect(() => {
    if (userId) {
      (async () => {
        const response = await getListConversation(userId);
        setListConversation(response);
      })();
    }
  }, [userId]);

  // Delete
  const handleCloseModal = () => {
    setActiveModal(!activeModal);
  };

  const handleDelete = async (conversationId: string) => {
    setIsLoading(true);
    const response = await deleteConversation(conversationId);
    if (response.success) {
      toast.success('Xóa đoạn chat thành công');
      setListConversation(prev => prev.filter(conversation => conversation.id !== conversationId));
      setIsLoading(false);
      handleCloseModal();
      setConversationDetail({} as IConversation);
    } else {
      toast.error('Xóa đoạn chat thất bại');
    }
  };

  // lấy detail conversation
  const handleSelectConversation = async (id: string) => {
    setConversationId(id);
    if (id === previousConversationId) {
      return;
    }
    setLoadingDetail(true);
    setLoadingMessageAI(null);
    const response = await getDetailConversation(id, userId);
    if (response) {
      setConversationDetail(response);
      setPreviousConversationId(id);
      setLoadingDetail(false);
    }
  };

  // hàm xử lý gửi tin nhắn mới và nhận tin nhắn trả lời
  const onSubmit = async (data: any) => {
    let finalData;
    if (conversationDetail.id && conversationDetail.id.length > 0) {
      finalData = {
        ...data,
        id: conversationDetail.id,
      };
    } else {
      finalData = { ...data };
    }

    reset();
    const newMessage = {
      sender_type: 'USER',
      message_text: data.prompt,
      created_at: new Date().toISOString(),
    };
    setConversationDetail((prev: any) => ({
      ...prev,
      messages: [...(prev.messages || []), newMessage],
    }));
    setLoadingMessageAI(false);
    reset({
      prompt: '',
    });
    const response = await sendMessageConversation(finalData);
    setConversationDetail((prev: any) => ({
      ...prev,
      id: response.data.id,
    }));

    if (!finalData.id && userId) {
      const newListConversation = await getListConversation(userId);
      setListConversation(newListConversation);
    }

    const reponseAi = {
      ...response.data,
      created_at: new Date().toISOString(),
      typeMessage: 'responseAi',
    };
    setConversationDetail((prev: any) => ({
      ...prev,
      messages: [...(prev.messages || []), reponseAi],
    }));
    setLoadingMessageAI(true);
  };

  return (
    <div className="flex h-[85vh] container-page">
      {userId && (
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="py-4 pr-4 border-b border-gray-200 max-h-[65px]">
            <button
              disabled={!LoadingMessageAI}
              onClick={() => {
                setConversationDetail({} as IConversation);
                setPreviousConversationId('');
                setLoadingMessageAI(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#4db6ac] text-white p-2 rounded-lg hover:bg-[#45a49a] transition-colors"
            >
              <AddIcon sx={{ fontSize: 20 }} />
              <span>Cuộc Trò Chuyện Mới</span>
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-70px)] scroll-select">
            {SortArrayToTimeStamp(listConversation).map(chat => (
              <div key={chat.id} className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                <div className="flex items-center gap-3 flex-1" onClick={() => handleSelectConversation(chat.id)}>
                  <ChatIcon sx={{ fontSize: 18 }} className="text-gray-500" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[150px]">{chat.title}</p>
                    <p className="text-xs text-gray-500">{convertTime(chat.created_at || '')}</p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setConversationId(chat.id);
                    setActiveModal(true);
                  }}
                  className="group size-[30px] hover:bg-white flex justify-center items-center rounded-full"
                >
                  <DeleteIcon
                    sx={{ fontSize: 18 }}
                    className="text-gray-300 group-hover:text-gray-600 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-4 max-h-[65px] min-h-[65px] ">
          <h1 className="font-semibold text-[18px] text-black line-clamp-1">Phiên trò chuyện:</h1>
          <span className="truncate max-w-[600px]">
            {loadingDetail ? (
              <div className="flex justify-center items-center h-screen">
                <div className="flex flex-row gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
            ) : (
              conversationDetail?.title
            )}
          </span>
        </div>

        <div className="flex-1 py-2 pl-2">
          <div className="max-w-full mx-auto flex-col flex justify-between h-full ">
            <div className="flex-1 pb-[20px] overflow-y-auto  max-h-[450px] scroll-select px-6">
              {loadingDetail ? (
                <LoadingMessage />
              ) : conversationDetail && conversationDetail?.messages?.length > 0 ? (
                conversationDetail?.messages.map((item: any, index: number) => <MessageAi key={index} message={item} />)
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                      Xin chào, <span className="text-[#4db6ac]">{userId ? auth.data.user_info.fullname : 'Bạn'}</span>
                    </h1>
                    <h2 className="text-2xl mb-4">Bạn muốn biết điều gì về vấn đề sức khỏe ?</h2>
                    <p className="text-gray-500 text-sm">
                      Sử dụng một trong những gợi ý phổ biến bên dưới hoặc tự đặt câu hỏi của riêng bạn
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <DescriptionIcon className="text-gray-600 mb-2" />
                      <p className="text-sm">Tạo lịch tái khám và theo dõi sức khỏe cá nhân</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <LocalHospitalIcon className="text-gray-600 mb-2" />
                      <p className="text-sm">Tra cứu thông tin về thuốc và liều dùng</p>
                    </div>
                  </div>
                </div>
              )}
              {!LoadingMessageAI && LoadingMessageAI != null && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex-1 flex justify-start items-center space-y-2">
                    <div className="h-max w-max px-4 py-3 bg-gray-200 rounded animate-pulse flex">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
                <Controller
                  name="prompt"
                  control={control}
                  render={({ field }) => {
                    return (
                      <input
                        {...field}
                        type="text"
                        placeholder="Hãy đặt câu hỏi bất kỳ...."
                        className="flex-1 p-2 outline-none"
                      />
                    );
                  }}
                />

                <button className="bg-[#4db6ac] p-2 rounded-full text-white">
                  <SendIcon sx={{ fontSize: 20 }} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm
        description="Dữ liệu sẽ không thể khôi phục"
        title="Bạn có chắc muốn xóa ?"
        isClose={handleCloseModal}
        isOpen={activeModal}
        submit={() => handleDelete(conversationId)}
        isLoading={isLoading}
        className="bg-red-500 hover:bg-red-600 text-white"
      />
    </div>
  );
};

export default ChatBoxPage;
