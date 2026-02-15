import { Platform } from 'react-native';

export const Colors = {
    light: {
        text: '#000000',
        background: '#FFFFFF',
        tint: '#13EC5B',
        icon: '#335145',
        tabIconDefault: '#335145',
        tabIconSelected: '#13EC5B',
    },
    dark: {
        text: '#FFFFFF',
        background: '#1E352F',
        tint: '#13EC5B',
        icon: '#94A3B8',
        tabIconDefault: '#335145',
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
    primary: Colors.light.tint,
    primaryDark: Colors.light.tint,
    backgroundDark: Colors.dark.background,
    backgroundLight: Colors.light.background,
    gradientStart: 'rgba(30, 53, 47, 0.92)',
    gradientEnd: 'rgba(30, 53, 47, 0.96)',
    inputBackground: 'rgba(19, 236, 91, 0.10)',
    inputBorder: 'rgba(19, 236, 91, 0.20)',
    secondaryButtonBg: 'rgba(19, 236, 91, 0.10)',
    secondaryButtonBorder: 'rgba(19, 236, 91, 0.20)',
    textWhite: Colors.light.background,
    textMuted: Colors.light.icon,
    textLink: Colors.light.tint,
    inactive: Colors.dark.icon,
};
