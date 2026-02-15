import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/tabs/haptic-tab';
import { AppColors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center" style={{ backgroundColor: AppColors.backgroundDark }}>
                <ActivityIndicator color={AppColors.primary} />
            </View>
        );
    }

    if (!isLoggedIn) {
        return <Redirect href="/(public)" />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: AppColors.primary,
                tabBarInactiveTintColor: AppColors.inactive,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: () => (
                    <View style={{ flex: 1, backgroundColor: AppColors.backgroundDark }}>
                        <View
                            pointerEvents="none"
                            style={{
                                ...StyleSheet.absoluteFillObject,
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            }}
                        />
                    </View>
                ),
                tabBarStyle: {
                    backgroundColor: AppColors.backgroundDark,
                    borderTopColor: 'rgba(255,255,255,0.10)',
                    paddingHorizontal: 8
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
                name="recipes"
                options={{
                    title: 'Recipes',
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
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('@/assets/images/profile.png')}
                            style={{ width: 19, height: 19, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
