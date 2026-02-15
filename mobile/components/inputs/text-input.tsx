import { MaterialCommunityIcons } from '@expo/vector-icons';
import { forwardRef, useState } from 'react';
import {
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  type TextInputProps as RNTextInputProps,
} from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';

export type TextInputProps = RNTextInputProps & {
  label?: string;
  labelAction?: {
    text: string;
    onPress: () => void;
  };
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const TextInput = forwardRef<RNTextInput, TextInputProps>(function TextInput(
  { label, labelAction, icon, secureTextEntry, className, ...rest },
  ref,
) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View className="w-full mb-4">
      {(label || labelAction) && (
        <View className="flex-row justify-between items-center mb-2">
          {label && (
            <ThemedText style={{ fontSize: 14, fontWeight: '500', color: AppColors.textWhite }}>
              {label}
            </ThemedText>
          )}
          {labelAction && (
            <TouchableOpacity onPress={labelAction.onPress}>
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: AppColors.textLink,
                }}
              >
                {labelAction.text}
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View
        className="flex-row items-center rounded-3xl px-4 h-[54px]"
        style={{
          backgroundColor: AppColors.inputBackground,
          borderWidth: 1,
          borderColor: AppColors.inputBorder,
        }}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={AppColors.textMuted}
            className="mr-3"
          />
        )}

        <RNTextInput
          ref={ref}
          className={`flex-1 text-base text-white ${className ?? ''}`}
          style={{
            paddingVertical: 0,
            paddingTop: 0,
            height: '100%',
            lineHeight: 16,
          }}
          placeholderTextColor={AppColors.textMuted}
          secureTextEntry={isSecure}
          textAlignVertical="center"
          {...rest}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure((prev) => !prev)} className="ml-2">
            <MaterialCommunityIcons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={AppColors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
