import React, { useState } from 'react';
import { X, Send, Bot, User as UserIcon } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm NutriAI Bot. How can I help you with your nutrition today?",
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "Hi! I'd like to know more about healthy breakfast options.",
      sender: 'user',
      timestamp: new Date(),
    },
    {
      id: 3,
      text: "Great question! For a healthy breakfast, I recommend options rich in protein and fiber. Some excellent choices include oatmeal with fruits and nuts, Greek yogurt with berries, or whole grain toast with avocado and eggs.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your message! I'm here to help with any nutrition questions you have.",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/30 z-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed bottom-6 right-6 z-50 w-100 h-150 bg-white rounded-2xl shadow-2xl shadow-[#13EC5B]/20 flex flex-col overflow-hidden border border-[#13EC5B]/20">
        <div className="bg-[#13EC5B] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#13EC5B]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">NutriAI Bot</h3>
              <p className="text-white/80 text-xs">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'bot'
                    ? 'bg-[#13EC5B]/20 border border-[#13EC5B]'
                    : 'bg-[#335145]/20 border border-[#335145]'
                }`}
              >
                {message.sender === 'bot' ? (
                  <Bot className="w-4 h-4 text-[#13EC5B]" />
                ) : (
                  <UserIcon className="w-4 h-4 text-[#335145]" />
                )}
              </div>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === 'bot'
                    ? 'bg-white border border-[#13EC5B]/20 text-[#1E352F]'
                    : 'bg-[#13EC5B] text-white'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span
                  className={`text-[10px] mt-1 block ${
                    message.sender === 'bot' ? 'text-[#335145]/60' : 'text-white/70'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-[#13EC5B]/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-[#13EC5B]/20 rounded-xl text-[#1E352F] placeholder:text-[#335145]/40 focus:outline-none focus:border-[#13EC5B] focus:ring-2 focus:ring-[#13EC5B]/20 transition-all text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`px-4 py-3 rounded-xl transition-all ${
                inputValue.trim()
                  ? 'bg-[#13EC5B] hover:bg-[#335145] text-white'
                  : 'bg-[#335145]/20 text-[#335145]/40 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
