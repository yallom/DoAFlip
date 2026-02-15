import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import ChatButton from '@/components/ChatButton'
import ChatBot from '@/components/ChatBot'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  
  const hideChatPages = ['/login', '/register'];
  const shouldShowChat = !hideChatPages.includes(location.pathname);

  return (
    <div className="app-container">
      <Outlet />
      {shouldShowChat && (
        <>
          <ChatButton onClick={() => setIsChatOpen(true)} />
          <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
      )}
    </div>
  )
}

export default App