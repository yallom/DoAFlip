import React from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';

export type SecondaryButtonProps = TouchableOpacityProps & {
    title: string;
    icon?: React.ReactNode;
};

export function SecondaryButton({ title, icon, className, ...rest }: SecondaryButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className={`flex-1 flex-row items-center justify-center gap-2 h-[52px] rounded-xl px-4 ${className ?? ''}`}
            style={{
                backgroundColor: AppColors.secondaryButtonBg,
                borderWidth: 1,
                borderColor: AppColors.secondaryButtonBorder,
            }}
            {...rest}
        >
            {icon && icon}
            <ThemedText style={{ fontSize: 15, fontWeight: '600', color: AppColors.textWhite }}>
                {title}
            </ThemedText>
        </TouchableOpacity>
    );
}
