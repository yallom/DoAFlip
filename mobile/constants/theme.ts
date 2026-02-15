import { Platform } from 'react-native';

export const Colors = {
    light: {
        text: '#11181C',
        background: '#F5F5F5',
        tint: '#13EC5B',
        icon: '#94A3B8',
        tabIconDefault: '#94A3B8',
        tabIconSelected: '#13EC5B',
    },
    dark: {
        text: '#FFFFFF',
        background: '#102216',
        tint: '#13EC5B',
        icon: '#94A3B8',
        tabIconDefault: '#94A3B8',
        tabIconSelected: '#13EC5B',
    },
};

export const Fonts = Platform.select({
    ios: {
        /** iOS `UIFontDescriptorSystemDesignDefault` */
        sans: 'system-ui',
        /** iOS `UIFontDescriptorSystemDesignSerif` */
        serif: 'ui-serif',
        /** iOS `UIFontDescriptorSystemDesignRounded` */
        rounded: 'ui-rounded',
        /** iOS `UIFontDescriptorSystemDesignMonospaced` */
        mono: 'ui-monospace',
    },
    default: {
        sans: 'normal',
        serif: 'serif',
        rounded: 'normal',
        mono: 'monospace',
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
});

export const AppColors = {
    primary: '#13EC5B',
    primaryDark: '#10B981',
    backgroundDark: '#102216',
    backgroundLight: '#F5F5F5',
    gradientStart: 'rgba(16, 34, 22, 0.92)',
    gradientEnd: 'rgba(16, 34, 22, 0.96)',
    inputBackground: 'rgba(16, 34, 22, 0.50)',
    inputBorder: 'rgba(255, 255, 255, 0.10)',
    secondaryButtonBg: 'rgba(255, 255, 255, 0.05)',
    secondaryButtonBorder: 'rgba(255, 255, 255, 0.10)',
    textWhite: '#FFFFFF',
    textMuted: 'rgba(255, 255, 255, 0.50)',
    textLink: '#13EC5B',
    inactive: '#94A3B8',
};
