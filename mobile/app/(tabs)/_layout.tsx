import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

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
