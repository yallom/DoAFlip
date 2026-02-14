import React, { useState } from 'react';
import { Plus, Share2, Download, MoreVertical, Send, Paperclip, Settings } from 'lucide-react';
import logoComp from '@/assets/logo_comp.png';
import botIcon from '@/assets/bot.png';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  category: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      content: "Hello Alex! I've analyzed your goal for maintaining ketosis while hitting your protein targets. For a target of 1,800 calories, here is your daily macro breakdown:",
      timestamp: '10:41 AM'
    },
    {
      id: '2',
      sender: 'assistant',
      content: "Would you like me to generate a meal plan based on these numbers for the upcoming week?",
      timestamp: '10:41 AM'
    },
    {
      id: '3',
      sender: 'user',
      content: "Yes, please! I'm also looking for something that involves minimal cooking on weekdays as I have a busy schedule.",
      timestamp: '10:42 AM'
    },
    {
      id: '4',
      sender: 'assistant',
      content: 'Absolutely! Let\'s focus on a "Meal Prep Sunday" strategy. Here\'s a quick look at your Monday:',
      timestamp: '10:42 AM'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [currentChat, setCurrentChat] = useState('Macros for Keto Plan');

  const chats: Chat[] = [
    { id: '1', title: 'Macros for Keto Plan', category: 'TODAY' },
    { id: '2', title: 'Muscle Gain Breakfast', category: 'TODAY' },
    { id: '3', title: 'Vegan Dinner Ideas', category: 'YESTERDAY' },
    { id: '4', title: 'Post-workout meal plan', category: 'YESTERDAY' },
    { id: '5', title: 'Intermittent Fasting Tips', category: 'LAST 7 DAYS' },
    { id: '6', title: 'Gluten-Free Snack List', category: 'LAST 7 DAYS' },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const groupedChats = chats.reduce((acc, chat) => {
    if (!acc[chat.category]) {
      acc[chat.category] = [];
    }
    acc[chat.category].push(chat);
    return acc;
  }, {} as Record<string, Chat[]>);

  return (
    <div className="flex h-screen bg-darkgreen">
      
      {/* Sidebar */}
      <div className="w-80 bg-darkgreen border-r border-lightgreen/20 flex flex-col">
        
        {/* Logo */}
        <div className="p-6 border-b border-lightgreen/20">
          <div className="flex items-center gap-3">
            <img src={logoComp} alt="NutriAI Logo" />
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-lightgreen hover:bg-yellow text-darkgreen font-semibold rounded-xl transition-all">
            <Plus size={20} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-4">
          {Object.entries(groupedChats).map(([category, categoryChats]) => (
            <div key={category} className="mb-6">
              <h3 className="text-xs font-semibold text-lightgreen/60 mb-2 px-2">
                {category}
              </h3>
              <div className="space-y-1">
                {categoryChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setCurrentChat(chat.title)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      currentChat === chat.title
                        ? 'bg-lightgreen/20 text-lightgreen'
                        : 'text-gray/80 hover:bg-green/20 hover:text-white'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm font-medium flex-1 truncate">{chat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-lightgreen/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-lightgreen/20 flex items-center justify-center">
                <span className="text-lightgreen font-semibold text-sm">AJ</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Alex Johnson</p>
                <p className="text-gray/60 text-xs">Premium Member</p>
              </div>
            </div>
            <button className="p-2 hover:bg-green/20 rounded-lg transition-colors">
              <Settings size={20} className="text-gray/60" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-lightgreen/20 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lightgreen animate-pulse"></div>
            <h2 className="text-white font-semibold">{currentChat}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-green/20 rounded-lg transition-colors">
              <Share2 size={20} className="text-gray/60" />
            </button>
            <button className="p-2 hover:bg-green/20 rounded-lg transition-colors">
              <Download size={20} className="text-gray/60" />
            </button>
            <button className="p-2 hover:bg-green/20 rounded-lg transition-colors">
              <MoreVertical size={20} className="text-gray/60" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {message.sender === 'assistant' && (
                <img src={botIcon} alt="Assistant" className="w-15 h-15 shrink-0 mt-1" />
              )}

              <div className={`max-w-2xl ${message.sender === 'user' ? 'order-first' : ''}`}>
                {message.sender === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-semibold text-sm">NutriAI</span>
                    <span className="text-xs text-lightgreen/60 uppercase font-medium">Assistant</span>
                  </div>
                )}
                
                <div className={`rounded-2xl p-4 ${
                  message.sender === 'user' 
                    ? 'bg-lightgreen text-darkgreen' 
                    : 'bg-green/20 text-white border border-lightgreen/20'
                }`}>
                  {message.content}
                  
                  {/* Macro Stats (only in first assistant message) */}
                  {message.id === '1' && (
                    <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-darkgreen/30 rounded-xl">
                      <div>
                        <p className="text-lightgreen text-xs font-medium mb-1">PROTEIN</p>
                        <p className="text-white text-2xl font-bold">135g</p>
                        <p className="text-gray/60 text-xs">30%</p>
                      </div>
                      <div>
                        <p className="text-lightgreen text-xs font-medium mb-1">FATS</p>
                        <p className="text-white text-2xl font-bold">130g</p>
                        <p className="text-gray/60 text-xs">65%</p>
                      </div>
                      <div>
                        <p className="text-lightgreen text-xs font-medium mb-1">NET CARBS</p>
                        <p className="text-white text-2xl font-bold">22g</p>
                        <p className="text-gray/60 text-xs">5%</p>
                      </div>
                    </div>
                  )}

                  {/* Meal Plan (only in last assistant message) */}
                  {message.id === '4' && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-lightgreen flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-darkgreen" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">Breakfast: Bulletproof Coffee + 2 Hard-boiled eggs (Prepped)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-lightgreen flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-darkgreen" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">Lunch: Salmon & Avocado salad with spinach and olive oil dressing (Cold, no cook)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-lightgreen flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-darkgreen" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">Dinner: Slow-cooker Keto Beef Stew (Batch cooked on Sunday)</p>
                        </div>
                      </div>
                      <p className="text-gray/80 text-sm mt-4">
                        I can provide the full grocery list and prep instructions. Should I include any dietary restrictions like dairy-free?
                      </p>
                    </div>
                  )}
                </div>

                {message.sender === 'user' && (
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <span className="text-xs text-gray/60">{message.timestamp}</span>
                    <span className="text-white font-medium text-sm">You</span>
                  </div>
                )}
              </div>

              {message.sender === 'user' && (
                <div className="w-10 h-10 rounded-full bg-lightgreen/20 flex items-center justify-center shrink-0">
                  <span className="text-lightgreen font-semibold text-sm">AJ</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-lightgreen/20 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-green/20 rounded-lg transition-colors">
                <Paperclip size={20} className="text-gray/60" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your nutrition question..."
                className="w-full pl-14 pr-14 py-4 bg-green/20 border border-lightgreen/30 rounded-xl text-white placeholder:text-gray/60 focus:outline-none focus:border-lightgreen focus:ring-2 focus:ring-lightgreen/20 transition-all"
              />
              <button 
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-lightgreen hover:bg-yellow rounded-lg transition-colors"
              >
                <Send size={20} className="text-darkgreen" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3">
              <button className="text-xs text-lightgreen/60 hover:text-lightgreen font-medium transition-colors">
                DAIRY-FREE OPTIONS
              </button>
              <button className="text-xs text-lightgreen/60 hover:text-lightgreen font-medium transition-colors">
                SHOPPING LIST
              </button>
              <button className="text-xs text-lightgreen/60 hover:text-lightgreen font-medium transition-colors">
                PREP INSTRUCTIONS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;