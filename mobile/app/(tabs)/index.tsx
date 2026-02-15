import React from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScrollViewComponent from '@/components/scrollviews/keyboard-scroll-view'; 

import { ChatHeader } from '@/components/chatbot/chat-header';
import { ChatInput } from '@/components/chatbot/chat-input';
import { MessageBox, MessageBoxProps } from '@/components/chatbot/message-box';
import { AppColors } from '@/constants/theme';

const MOCK_MESSAGES: MessageBoxProps[] = [
  {
    message:
      "Hello! I'm NutriAI. I've analyzed your breakfast. Based on your goals, you should aim for more protein in your next meal. What are you planning for lunch?",
    timestamp: '09:41 AM',
    isUser: false,
  },
  {
    message:
      "I'm thinking about a grilled chicken salad with avocado and quinoa. How does that look for my macros?",
    timestamp: '09:42 AM',
    isUser: true,
  },
  {
    message:
      "That's an excellent choice! It hits your target macros perfectly. Here's the breakdown:\n\nProtein: 32g\nCarbs: 24g\nFats: 18g\n\nTotal Calories: ~420 kcal",
    timestamp: '09:42 AM',
    isUser: false,
  },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1" style={{ backgroundColor: AppColors.backgroundLight }}>
      <View style={{ height: insets.top, backgroundColor: AppColors.backgroundDark }} />
      <ScrollViewComponent className="flex-1">

      <ChatHeader />

      <FlatList
        data={MOCK_MESSAGES}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <MessageBox {...item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      />
      <View
        className="flex-row items-center"
        style={{
          backgroundColor: AppColors.backgroundLight,
          borderTopWidth: 1,
          borderTopColor: '#FFFFFF1A',
        }}
      >
        <ChatInput
          onSend={(message) => {
            console.log('Send:', message);
          }}
        />
      </View>
        </ ScrollViewComponent>
    </View>
  );
}
