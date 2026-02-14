import { ActivityIndicator, TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';

export type PrimaryButtonProps = TouchableOpacityProps & {
    title: string;
    loading?: boolean;
};

export function PrimaryButton({
    title,
    loading = false,
    disabled,
    className,
    ...rest
}: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            disabled={disabled || loading}
            className={`w-full h-14 rounded-full items-center justify-center shadow-lg shadow-[#13EC5B30] blur-20 ${
                disabled || loading ? 'opacity-60' : ''
            } ${className ?? ''}`}
            style={{ backgroundColor: AppColors.primary }}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={AppColors.backgroundDark} />
            ) : (
                <ThemedText
                    style={{ fontSize: 18, fontWeight: '700', color: AppColors.backgroundDark }}
                >
                    {title}
                </ThemedText>
            )}
        </TouchableOpacity>
    );
}
