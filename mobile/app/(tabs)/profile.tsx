import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

import { ConfirmLogoutModal } from '@/components/modals/confirm-logout-modal';
import { ProfileEditModal } from '@/components/modals/profile-edit-modal';
import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '@/hooks/useUser';

export default function ProfileScreen() {
    const { bottom } = useSafeAreaInsets()
    const { logout, logoutLoading } = useAuth();
    const { user } = useUser();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [allergies, setAllergies] = useState<string[]>([]);
    const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(['Vegetarian', 'Low Carb']);

    const mapAllergyLabel = (allergy: string) => {
        switch (allergy) {
            case 'peanuts':
                return 'Peanuts';
            case 'lactose':
                return 'Lactose';
            case 'soy':
                return 'Soy';
            case 'seafood':
                return 'Seafood';
            default:
                return allergy;
        }
    };

    useEffect(() => {
        if (!user) return;

        setName(user.name ?? '');
        setEmail(user.email ?? '');
        setAge(String(user.age ?? ''));
        setGender(user.gender === 'Masculine' ? 'Male' : 'Female');
        setHeight(String(user.height ?? ''));
        setWeight(String(user.weight ?? ''));
        setAllergies((user.allergies ?? []).map(mapAllergyLabel));
    }, [user]);

    const handleConfirmLogout = async () => {
        await logout();
        setIsLogoutModalOpen(false);
    };

    const weightValue = Number.parseFloat(weight);
    const heightValue = Number.parseFloat(height);
    const bmi =
        Number.isFinite(weightValue) && Number.isFinite(heightValue) && heightValue > 0
            ? (weightValue / Math.pow(heightValue / 100, 2)).toFixed(1)
            : '--';

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.backgroundLight }}>
            <ScrollView className="flex-1 px-4 pt-6">
                <View className="bg-white rounded-3xl p-6 mb-4 border border-[#13EC5B]/20">
                    <View className="flex-row items-start justify-between">
                        <View className="flex-row items-center gap-4">
                            <View
                                className="w-20 h-20 rounded-full items-center justify-center"
                                style={{ backgroundColor: AppColors.primary }}
                            >
                                <Image
                                    source={require('@/assets/images/logo.png')}
                                    style={{ width: 40, height: 40 }}
                                    resizeMode="contain"
                                />
                            </View>

                            <View className='max-w-40'>
                                <ThemedText numberOfLines={1} className="text-xl font-bold text-stone-900">{name}</ThemedText>
                                <ThemedText numberOfLines={1} className="text-sm text-stone-600 max-w-40">{email}</ThemedText>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => setIsEditModalOpen(true)}
                            className="px-4 py-2 rounded-xl"
                            style={{ backgroundColor: AppColors.primary }}
                        >
                            <MaterialCommunityIcons name="pencil" size={20} color={AppColors.backgroundLight} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="bg-white rounded-3xl p-6 mb-4 border border-[#13EC5B]/20">
                    <View className="flex-row items-center gap-2 mb-4">
                        <View
                            className="w-8 h-8 rounded-lg items-center justify-center"
                            style={{ backgroundColor: AppColors.primary + '33' }}
                        >
                            <MaterialCommunityIcons name="account" size={20} color={AppColors.primary} />
                        </View>
                        <ThemedText className="text-lg font-bold text-stone-900">Physical Profile</ThemedText>
                    </View>

                    <View className="flex-row flex-wrap gap-3">
                        <View className="bg-white rounded-2xl p-4 border border-[#13EC5B]/20 flex-1 min-w-[45%]">
                            <ThemedText className="text-xs font-semibold text-[#13EC5B] mb-1">AGE</ThemedText>
                            <ThemedText className="text-2xl font-bold text-stone-900">{age} yrs</ThemedText>
                        </View>

                        <View className="bg-white rounded-2xl p-4 border border-[#13EC5B]/20 flex-1 min-w-[45%]">
                            <ThemedText className="text-xs font-semibold text-[#13EC5B] mb-1">GENDER</ThemedText>
                            <ThemedText className="text-lg font-bold text-stone-900">{gender}</ThemedText>
                        </View>

                        <View className="bg-white rounded-2xl p-4 border border-[#13EC5B]/20 flex-1 min-w-[45%]">
                            <ThemedText className="text-xs font-semibold text-[#13EC5B] mb-1">WEIGHT</ThemedText>
                            <ThemedText className="text-2xl font-bold text-stone-900">{weight} {weightUnit}</ThemedText>
                        </View>

                        <View className="bg-white rounded-2xl p-4 border border-[#13EC5B]/20 flex-1 min-w-[45%]">
                            <ThemedText className="text-xs font-semibold text-[#13EC5B] mb-1">HEIGHT</ThemedText>
                            <ThemedText className="text-2xl font-bold text-stone-900">{height} cm</ThemedText>
                        </View>
                    </View>
                </View>

                <View className="bg-white rounded-3xl p-6 mb-4 border border-[#13EC5B]/20">
                    <View className="flex-row items-center gap-2 mb-4">
                        <View
                            className="w-8 h-8 rounded-lg items-center justify-center"
                            style={{ backgroundColor: AppColors.primary + '33' }}
                        >
                            <ThemedText className="text-lg">🍽️</ThemedText>
                        </View>
                        <ThemedText className="text-lg font-bold text-stone-900">Nutritional Profile</ThemedText>
                    </View>

                    <View className="mb-4">
                        <ThemedText className="text-xs font-semibold text-[#13EC5B] mb-3">KNOWN ALLERGIES</ThemedText>
                        <View className="flex-row flex-wrap gap-2">
                            {allergies.map((allergy) => (
                                <View
                                    key={allergy}
                                    className="px-4 py-2 rounded-full border-2 border-[#13EC5B]"
                                    style={{ backgroundColor: AppColors.primary + '33' }}
                                >
                                    <ThemedText className="text-sm font-medium text-[#13EC5B]">{allergy}</ThemedText>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View>
                        <ThemedText className="text-xs font-semibold text-[#13EC5B] mb-3">DIETARY PREFERENCES</ThemedText>
                        <View className="flex-row flex-wrap gap-2">
                            {dietaryPreferences.map((pref) => (
                                <View
                                    key={pref}
                                    className="px-4 py-2 rounded-full border-2 border-[#13EC5B]"
                                    style={{ backgroundColor: AppColors.primary + '33' }}
                                >
                                    <ThemedText className="text-sm font-medium text-[#13EC5B]">{pref}</ThemedText>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View className="bg-white rounded-3xl p-6 mb-4 border border-[#13EC5B]/20">
                    <ThemedText className="text-lg font-bold text-stone-900 mb-6">Health Snapshot</ThemedText>

                    <View className="items-center mb-6">
                        <View className="relative w-32 h-32 mb-4 items-center justify-center">
                            <View
                                className="w-32 h-32 rounded-full border-8"
                                style={{ borderColor: AppColors.primary + '33' }}
                            />
                            <View
                                className="absolute w-32 h-32 rounded-full border-8 border-transparent"
                                style={{
                                    borderTopColor: AppColors.primary,
                                    borderRightColor: AppColors.primary,
                                    transform: [{ rotate: '0deg' }]
                                }}
                            />
                            <View className="absolute items-center">
                                <ThemedText className="text-3xl font-bold text-stone-900">{bmi}</ThemedText>
                                <ThemedText className="text-xs text-stone-600">BMI</ThemedText>
                            </View>
                        </View>

                        <View className="items-center">
                            <ThemedText className="font-semibold text-[#13EC5B] mb-2">Healthy Range</ThemedText>
                            <ThemedText className="text-sm text-stone-600">Body Mass Index is within normal range</ThemedText>
                        </View>
                    </View>
                </View>

                <View className="bg-white rounded-3xl p-6 mb-6 border border-[#13EC5B]/20">
                    <ThemedText className="text-lg font-bold text-stone-900 mb-4">Account Settings</ThemedText>

                    <View className="gap-2">
                        <TouchableOpacity className="flex-row items-center justify-between p-4 bg-white border border-[#13EC5B]/20 rounded-xl">
                            <View className="flex-row items-center gap-3">
                                <MaterialCommunityIcons name="bell-outline" size={20} color={AppColors.primary} />
                                <View>
                                    <ThemedText className="text-sm font-semibold text-stone-900">Notifications</ThemedText>
                                    <ThemedText className="text-xs text-stone-600">Manage your notifications</ThemedText>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color={AppColors.textMuted} />
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center justify-between p-4 bg-white border border-[#13EC5B]/20 rounded-xl">
                            <View className="flex-row items-center gap-3">
                                <MaterialCommunityIcons name="shield-check-outline" size={20} color={AppColors.primary} />
                                <View>
                                    <ThemedText className="text-sm font-semibold text-stone-900">Privacy & Security</ThemedText>
                                    <ThemedText className="text-xs text-stone-600">Control your privacy settings</ThemedText>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color={AppColors.textMuted} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsLogoutModalOpen(true)}
                            className="flex-row items-center justify-between p-4 bg-white border border-[#13EC5B]/20 rounded-xl"
                        >
                            <View className="flex-row items-center gap-3">
                                <MaterialCommunityIcons name="logout" size={20} color="#ef4444" />
                                <View>
                                    <ThemedText className="text-sm font-semibold text-stone-900">Logout</ThemedText>
                                    <ThemedText className="text-xs text-stone-600">Sign out of your account</ThemedText>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color={AppColors.textMuted} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <ProfileEditModal
                visible={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                bottomInset={bottom}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                height={height}
                setHeight={setHeight}
                weight={weight}
                setWeight={setWeight}
                weightUnit={weightUnit}
                setWeightUnit={setWeightUnit}
                allergies={allergies}
                setAllergies={setAllergies}
                dietaryPreferences={dietaryPreferences}
                setDietaryPreferences={setDietaryPreferences}
            />

            <ConfirmLogoutModal
                visible={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleConfirmLogout}
                isLoading={logoutLoading}
            />
        </SafeAreaView>
    );
}
