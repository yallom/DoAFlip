import React, { useState, useRef } from 'react';
import { FlatList, View, ActivityIndicator, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScrollViewComponent from '@/components/scrollviews/keyboard-scroll-view'; 

import { ChatHeader } from '@/components/chatbot/chat-header';
import { ChatInput } from '@/components/chatbot/chat-input';
import { MessageBox, MessageBoxProps } from '@/components/chatbot/message-box';
import { AppColors } from '@/constants/theme';

const API_BASE_URL = 'https://histioid-bryce-granolithic.ngrok-free.dev';

interface Message extends MessageBoxProps {
  id: string;
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      message: "Olá! Sou o NutriAI. Como posso ajudar com a tua nutrição hoje?",
      timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      message: messageText,
      timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        message: data.response || 'Desculpa, não consegui processar a tua pergunta.',
        timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        message: 'Erro ao comunicar com o servidor. Verifica se está a correr.',
        timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: AppColors.backgroundLight }}>
      <View style={{ height: insets.top, backgroundColor: AppColors.backgroundDark }} />
      <ScrollViewComponent className="flex-1">

      <ChatHeader />

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBox {...item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      />
      
      {isLoading && (
        <View className="flex-row items-center px-4 pb-2">
          <ActivityIndicator size="small" color={AppColors.primary} />
          <Text className="ml-2 text-sm" style={{ color: AppColors.backgroundDark }}>
            A pensar...
          </Text>
        </View>
      )}

      <View
        className="flex-row items-center"
        style={{
          backgroundColor: AppColors.backgroundLight,
          borderTopWidth: 1,
          borderTopColor: '#FFFFFF1A',
        }}
      >
        <ChatInput
          onSend={handleSend}
        />
      </View>
        </ScrollViewComponent>
    </View>
  );
}