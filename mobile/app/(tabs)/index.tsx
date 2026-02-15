import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, View, ActivityIndicator, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      message: "Olá! Sou o NutriAI. Como posso ajudar com a tua nutrição hoje?",
      timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollToEnd, setShowScrollToEnd] = useState(false);
  const listRef = useRef<FlatList<Message>>(null);
  const prevLengthRef = useRef(messages.length);

  const scrollToEnd = useCallback((animated = true) => {
    listRef.current?.scrollToEnd({ animated });
  }, []);

  useEffect(() => {
    scrollToEnd(false);
  }, [scrollToEnd]);

  useEffect(() => {
    const prevLength = prevLengthRef.current;
    if (messages.length <= prevLength) {
      prevLengthRef.current = messages.length;
      return;
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.isUser) {
      scrollToEnd(true);
      setShowScrollToEnd(false);
    } else if (isAtBottom) {
      scrollToEnd(true);
      setShowScrollToEnd(false);
    } else {
      setShowScrollToEnd(true);
    }

    prevLengthRef.current = messages.length;
  }, [messages, isAtBottom, scrollToEnd]);

  const handleSend = useCallback(async (messageText: string) => {
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
    }
  }, [isLoading]);

  const handleScroll = useCallback(
    (event: {
      nativeEvent: {
        layoutMeasurement: { height: number };
        contentOffset: { y: number };
        contentSize: { height: number };
      };
    }) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const paddingToBottom = 24;
      const atBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

      setIsAtBottom(atBottom);
      if (atBottom) {
        setShowScrollToEnd(false);
      }
    },
    [],
  );

  const handleOnLayout = (Event: any) => {
    setInputHeight(Event.nativeEvent.layout.height);
  }

  const keyboardOffset = 2;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      style={{ backgroundColor: AppColors.backgroundLight }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardOffset}
    >
      <View style={{ height: insets.top, backgroundColor: AppColors.backgroundDark }} />

      <ChatHeader />

      <View className="flex-1">
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBox {...item} />}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 20,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScroll={handleScroll}
          scrollEventThrottle={16}
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

        {showScrollToEnd && (
          <TouchableOpacity
            onPress={() => scrollToEnd(true)}
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{
              position: 'absolute',
              right: 16,
              bottom: inputHeight + 24,
              backgroundColor: AppColors.primary,
              shadowColor: '#13EC5B',
              shadowOpacity: 0.25,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 10,
            }}
          >
            <MaterialCommunityIcons name="chevron-down" size={24} color={AppColors.backgroundDark} />
          </TouchableOpacity>
        )}
      </View>

      <View
        onLayout={(event) => handleOnLayout(event)}
        className="flex-row items-center"
        style={{
          backgroundColor: AppColors.backgroundLight,
          borderTopWidth: 1,
          borderTopColor: '#FFFFFF1A',
        }}
      >
        <ChatInput onSend={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}
