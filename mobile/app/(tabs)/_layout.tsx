import { Tabs } from 'expo-router';
import { Image } from 'react-native';

import { HapticTab } from '@/components/tabs/haptic-tab';
import { AppColors } from '@/constants/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: AppColors.primary,
                tabBarInactiveTintColor: AppColors.inactive,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: {
                    backgroundColor: AppColors.backgroundDark,
                    borderTopColor: 'rgba(255,255,255,0.05)',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('@/assets/images/chat.png')}
                            style={{ width: 20, height: 20, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    title: 'Stats',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('@/assets/images/stats.png')}
                            style={{ width: 20, height: 20, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="meals"
                options={{
                    title: 'Meals',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('@/assets/images/meals.png')}
                            style={{ width: 20, height: 20, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('@/assets/images/settings.png')}
                            style={{ width: 20, height: 20, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
