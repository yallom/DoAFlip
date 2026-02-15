import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';

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
      text: "Olá! Sou o NutriAI Bot. Como posso ajudar com a tua nutrição hoje?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputValue }),
        });

        if (!response.ok) {
          throw new Error('Erro ao comunicar com o servidor');
        }

        const data = await response.json();
        
        const botResponse: Message = {
          id: messages.length + 2,
          text: data.response || 'Desculpa, não consegui processar a tua pergunta.',
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Erro:', error);
        const errorMessage: Message = {
          id: messages.length + 2,
          text: 'Desculpa, ocorreu um erro. Verifica se o servidor está a correr.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
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
      
      <div className="fixed bottom-6 right-6 z-50 w-100 h-150 bg-white rounded-2xl shadow-2xl shadow-primary-green/20 flex flex-col overflow-hidden border border-primary-green/20">
        <div className="bg-primary-green px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-green" />
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
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.sender === 'bot'
                    ? 'bg-primary-green/20 border border-primary-green'
                    : 'bg-dark-green-1/20 border border-dark-green-1'
                }`}
              >
                {message.sender === 'bot' ? (
                  <Bot className="w-4 h-4 text-primary-green" />
                ) : (
                  <UserIcon className="w-4 h-4 text-dark-green-1" />
                )}
              </div>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === 'bot'
                    ? 'bg-white border border-primary-green/20 text-dark-green-2'
                    : 'bg-primary-green text-white'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                <span
                  className={`text-[10px] mt-1 block ${
                    message.sender === 'bot' ? 'text-dark-green-1/60' : 'text-white/70'
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
          
          {isLoading && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary-green/20 border border-primary-green">
                <Bot className="w-4 h-4 text-primary-green" />
              </div>
              <div className="bg-white border border-primary-green/20 rounded-2xl px-4 py-3">
                <Loader2 className="w-4 h-4 text-primary-green animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-primary-green/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Escreve a tua mensagem..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gray-50 border border-primary-green/20 rounded-xl text-dark-green-2 placeholder:text-dark-green-1/40 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={`px-4 py-3 rounded-xl transition-all ${
                inputValue.trim() && !isLoading
                  ? 'bg-primary-green hover:bg-dark-green-1 text-white'
                  : 'bg-dark-green-1/20 text-dark-green-1/40 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;