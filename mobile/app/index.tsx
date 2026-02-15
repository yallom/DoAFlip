import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { AppColors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: AppColors.backgroundDark }}
      >
        <ActivityIndicator color={AppColors.primary} />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? '/(tabs)' : '/(public)'} />;
}
