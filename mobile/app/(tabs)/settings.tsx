import { ActivityIndicator, View } from 'react-native';

import { PrimaryButton } from '@/components/buttons/primary-button';
import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

export default function SettingsScreen() {
  const { user, loading } = useUser();
  const { logout, logoutLoading } = useAuth();

  return (
    <View className="flex-1" style={{ backgroundColor: AppColors.backgroundDark }}>
      <View className="px-6 pt-12">
        <ThemedText style={{ color: AppColors.textWhite, fontSize: 22, fontWeight: '700' }}>
          Profile
        </ThemedText>

        {loading ? (
          <View className="mt-10 items-center">
            <ActivityIndicator color={AppColors.primary} />
          </View>
        ) : user ? (
          <View
            className="mt-6 p-5 rounded-3xl"
            style={{ backgroundColor: AppColors.inputBackground, borderColor: AppColors.inputBorder, borderWidth: 1 }}
          >
            <ThemedText style={{ color: AppColors.textWhite, fontSize: 18, fontWeight: '700' }}>
              {user.name}
            </ThemedText>
            <ThemedText style={{ color: AppColors.textMuted, marginTop: 4 }}>{user.email}</ThemedText>

            <View className="mt-5">
              <ThemedText style={{ color: AppColors.textWhite, marginBottom: 6 }}>
                Age: {user.age}
              </ThemedText>
              <ThemedText style={{ color: AppColors.textWhite, marginBottom: 6 }}>
                Height: {user.height} cm
              </ThemedText>
              <ThemedText style={{ color: AppColors.textWhite, marginBottom: 6 }}>
                Weight: {user.weight} kg
              </ThemedText>
              <ThemedText style={{ color: AppColors.textWhite, marginBottom: 6 }}>
                Gender: {user.gender}
              </ThemedText>
              <ThemedText style={{ color: AppColors.textWhite }}>Goal: {user.goal}</ThemedText>
            </View>
          </View>
        ) : (
          <View className="mt-10">
            <ThemedText style={{ color: AppColors.textMuted }}>
              No user data loaded yet.
            </ThemedText>
          </View>
        )}
      </View>

      <View className="px-6 mt-8">
        <PrimaryButton title="Logout" loading={logoutLoading} onPress={logout} />
      </View>
    </View>
  );
}
