import { useState } from 'react';
import { TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';

import { AppColors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type ChatInputProps = {
    onSend?: (message: string) => void;
};

export function ChatInput({ onSend }: ChatInputProps) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim() && onSend) {
            onSend(text.trim());
            setText('');
        }
    };

    return (
        <View
            className="flex-row items-center px-4 py-3 gap-3"
            style={{ backgroundColor: AppColors.backgroundDark }}
        >
            <TouchableOpacity
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{
                    backgroundColor: AppColors.inputBackground,
                    borderWidth: 1,
                    borderColor: AppColors.inputBorder,
                }}
            >
                <MaterialCommunityIcons name="plus" size={22} color={AppColors.textMuted} />
            </TouchableOpacity>

            <View
                className="flex-1 flex-row items-center rounded-full px-4 h-11"
                style={{
                    backgroundColor: AppColors.inputBackground,
                    borderWidth: 1,
                    borderColor: AppColors.inputBorder,
                }}
            >
                <RNTextInput
                    className="flex-1 text-sm text-white"
                    placeholder="Tell NutriAI what you ate..."
                    placeholderTextColor={AppColors.textMuted}
                    value={text}
                    onChangeText={setText}
                    returnKeyType="send"
                    onSubmitEditing={handleSend}
                />
            </View>

            <TouchableOpacity
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: AppColors.primary }}
                onPress={handleSend}
            >
                <MaterialCommunityIcons name="send" size={20} color={AppColors.backgroundDark} />
            </TouchableOpacity>
        </View>
    );
}
