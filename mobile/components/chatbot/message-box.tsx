import { Image, View } from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';

export type MessageBoxProps = {
    message: string;
    timestamp: string;
    isUser?: boolean;
};

export function MessageBox({ message, timestamp, isUser = false }: MessageBoxProps) {
    return (
        <View className={`flex-row mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <View
                    className="w-11 h-11 rounded-full items-center justify-center mr-2 mt-1"
                    style={{ backgroundColor: `${AppColors.primary}1A` }}
                >
                    <Image
                        source={require('@/assets/images/chatbot.png')}
                        style={{ width: 21, height: 21, tintColor: AppColors.primary }}
                        resizeMode="contain"
                    />
                </View>
            )}

            <View className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
                <View
                    className={`rounded-2xl ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} px-4 py-3`}
                    style={{
                        backgroundColor: isUser ? AppColors.primary : AppColors.secondaryButtonBg,
                    }}
                >
                    <ThemedText
                        className="text-[15px] leading-5"
                        style={{
                            color: isUser ? AppColors.backgroundDark : AppColors.textWhite,
                        }}
                    >
                        {message}
                    </ThemedText>
                </View>

                <ThemedText
                    type="default"
                    className="!text-sm mt-1 mx-1"
                    style={{ color: AppColors.textMuted }}
                >
                    {timestamp}
                </ThemedText>
            </View>
        </View>
    );
}
