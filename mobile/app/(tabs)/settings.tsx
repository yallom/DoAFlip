import { View } from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';

export default function SettingsScreen() {
    return (
        <View
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: AppColors.backgroundDark }}
        >
            <ThemedText style={{ color: AppColors.textWhite, fontSize: 20 }}>Settings</ThemedText>
        </View>
    );
}
