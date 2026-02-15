import { useState } from 'react';
import { TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';

import { AppColors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type ChatInputProps = {
  onSend?: (message: string) => void;
};

export function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    try {
      setIsLoading(true);
      if (text.trim() && onSend) {
        onSend(text.trim());
        setText('');
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      className="flex-row rounded-xl items-center mx-4 px-4 py-2.5 my-4 gap-1"
      style={{
        backgroundColor: AppColors.secondaryButtonBg,
        borderWidth: 1,
        borderColor: '#FFFFFF1A',
      }}
    >
      <TouchableOpacity
        className="w-11 h-11 rounded-full items-center align-middle justify-center"
        style={{
          backgroundColor: AppColors.secondaryButtonBg,
          borderWidth: 1,
          borderColor: AppColors.inputBorder,
        }}
      >
        <MaterialCommunityIcons name="plus" size={25} color={AppColors.inactive} />
      </TouchableOpacity>

      <View className="flex-1 flex-row items-center rounded-full px-4">
        <RNTextInput
          className="flex-1 text-lg text-white border-0 pb-1 pt-0"
          placeholder="Tell NutriAI what you ate..."
          placeholderTextColor={AppColors.textMuted}
          multiline
          textAlignVertical="center"
          value={text}
          onChangeText={setText}
          submitBehavior="newline"
        />
      </View>

      <TouchableOpacity
        className="w-11 h-11 rounded-full items-center justify-center"
        style={{
          backgroundColor: AppColors.primary,
          shadowColor: '#13EC5B',
          shadowOpacity: 0.3,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 5 },
          elevation: 10,
        }}
        onPress={handleSend}
        disabled={isLoading}
      >
        <MaterialCommunityIcons name="send" size={20} color={AppColors.backgroundDark} />
      </TouchableOpacity>
    </View>
  );
}
