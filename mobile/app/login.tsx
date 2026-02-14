import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { PrimaryButton } from '@/components/buttons/primary-button';
import { SecondaryButton } from '@/components/buttons/secondary-button';
import { TextInput } from '@/components/inputs/text-input';
import { KeyboardScrollView } from '@/components/scrollviews/keyboard-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <LinearGradient
            colors={[AppColors.gradientStart, AppColors.gradientEnd]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <KeyboardScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                    <View className="items-center mb-4">
                        <Image
                            source={require('@/assets/images/login-logo.png')}
                            style={{
                                width: 70,
                                height: 70,
                            }}
                            resizeMode="contain"
                        />
                    </View>

                    <ThemedText type="title" className="font-bold text-white text-center mb-1">
                        NutriAI
                    </ThemedText>
                    <ThemedText
                        darkColor="rgba(255,255,255,0.5)"
                        type="subtitle"
                        className="text-white/50 text-center mb-16"
                    >
                        Fuel your potential
                    </ThemedText>

                    <View className="w-full mb-6">
                        <TextInput
                            label="Email Address"
                            icon="email-outline"
                            placeholder="name@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <TextInput
                            label="Password"
                            labelAction={{
                                text: 'Forgot?',
                                onPress: () => {},
                            }}
                            icon="lock-outline"
                            placeholder="••••••••"
                            secureTextEntry
                            autoComplete="password"
                            value={password}
                            onChangeText={setPassword}
                        />

                        <PrimaryButton
                            title="Sign In"
                            onPress={() => {
                                router.push('/');
                            }}
                            className="mt-2"
                        />
                    </View>

                    <View className="flex-row items-center mb-6">
                        <View className="flex-1 h-px bg-white/15" />
                        <ThemedText className="text-sm text-white/50 mx-4">
                            Or continue with
                        </ThemedText>
                        <View className="flex-1 h-px bg-white/15" />
                    </View>

                    <View className="flex-row gap-3 mb-8">
                        <SecondaryButton
                            title="Google"
                            icon={
                                <MaterialCommunityIcons
                                    name="google"
                                    size={20}
                                    color={AppColors.textWhite}
                                />
                            }
                            onPress={() => {}}
                        />
                        <SecondaryButton
                            title="GitHub"
                            icon={
                                <MaterialCommunityIcons
                                    name="github"
                                    size={20}
                                    color={AppColors.textWhite}
                                />
                            }
                            onPress={() => {}}
                        />
                    </View>

                    <View className="flex-row justify-center items-center mt-auto">
                        <ThemedText className="text-[15px] text-white/50">
                            Don't have an account?{' '}
                        </ThemedText>
                        <TouchableOpacity>
                            <ThemedText
                                className="text-[15px] font-semibold"
                                style={{ color: AppColors.textLink }}
                            >
                                Sign Up
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </KeyboardScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}
