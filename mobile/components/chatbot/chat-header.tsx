import { Image, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function ChatHeader() {
  return (
    <View
      className="flex-row items-center px-4 py-3 border-b border-white/10"
      style={{
        backgroundColor: AppColors.backgroundDark,
      }}
    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-3 border border-lime-500/20"
        style={{
          backgroundColor: AppColors.primary + '1A',
        }}
      >
        <Image
          source={require('@/assets/images/logo-chat-bot.png')}
          style={{ width: 22, height: 22, tintColor: AppColors.primary }}
          resizeMode="contain"
        />
      </View>

      <View className="flex-1">
        <ThemedText lightColor={AppColors.textWhite} className="text-white text-lg font-bold">NutriAI Bot </ThemedText>
        <View className="flex-row items-center gap-1">
          <View className="w-2 h-2 rounded-full" style={{ backgroundColor: AppColors.primary }} />
          <ThemedText lightColor={AppColors.textWhite} className="!text-sm text-lime-500">
            Online
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
