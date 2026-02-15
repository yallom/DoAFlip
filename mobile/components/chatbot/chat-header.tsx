import { Image, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function ChatHeader() {
  return (
    <View
      className="flex-row items-center px-4 py-3"
      style={{
        backgroundColor: AppColors.backgroundDark,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF1A',
      }}
    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-3"
        style={{
          backgroundColor: `${AppColors.primary}1A`,
          borderWidth: 1,
          borderColor: `${AppColors.primary}30`,
        }}
      >
        <Image
          source={require('@/assets/images/logo-chat-bot.png')}
          style={{ width: 22, height: 22, tintColor: AppColors.primary }}
          resizeMode="contain"
        />
      </View>

      <View className="flex-1">
        <ThemedText className="text-white text-lg font-bold">NutriAI</ThemedText>
        <View className="flex-row items-center gap-1">
          <View className="w-2 h-2 rounded-full" style={{ backgroundColor: AppColors.primary }} />
          <ThemedText className="!text-sm" style={{ color: AppColors.primary }}>
            Online
          </ThemedText>
        </View>
      </View>

      <TouchableOpacity className="p-2">
        <MaterialCommunityIcons name="magnify" size={24} color={AppColors.textWhite} />
      </TouchableOpacity>
    </View>
  );
}
