import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-green hover:bg-dark-green-1 text-white rounded-full shadow-lg shadow-primary-green/30 hover:shadow-dark-green-1/30 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
      aria-label="Open chat"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default ChatButton;
