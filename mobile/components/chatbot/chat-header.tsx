import { Image, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function ChatHeader() {
    return (
        <View
            className="flex-row items-center px-4 py-3"
            style={{ backgroundColor: AppColors.backgroundDark }}
        >
            {/* Bot avatar */}
            <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: `${AppColors.primary}1A` }}
            >
                <Image
                    source={require('@/assets/images/chatbot.png')}
                    style={{ width: 22, height: 22, tintColor: AppColors.primary }}
                    resizeMode="contain"
                />
            </View>

            {/* Title & Status */}
            <View className="flex-1">
                <ThemedText className="text-white text-lg font-bold">NutriAI</ThemedText>
                <View className="flex-row items-center gap-1">
                    <View
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: AppColors.primary }}
                    />
                    <ThemedText className="text-xs" style={{ color: AppColors.primary }}>
                        ONLINE NOW
                    </ThemedText>
                </View>
            </View>

            {/* Search */}
            <TouchableOpacity className="p-2">
                <MaterialCommunityIcons name="magnify" size={22} color={AppColors.textWhite} />
            </TouchableOpacity>

            {/* Profile */}
            <TouchableOpacity className="ml-1 p-2">
                <View
                    className="w-8 h-8 rounded-lg items-center justify-center"
                    style={{ backgroundColor: AppColors.primary }}
                >
                    <MaterialCommunityIcons
                        name="account"
                        size={18}
                        color={AppColors.backgroundDark}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}
