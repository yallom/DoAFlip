import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Alert, Image, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';

import { PrimaryButton } from '@/components/buttons/primary-button';
import { TextInput } from '@/components/inputs/text-input';
import KeyboardScrollView from '@/components/scrollviews/keyboard-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const { login, loginLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Preenche os dados', 'Email e password sao obrigatorios.');
      return;
    }

    const success = await login(email.trim(), password);
    if (success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <LinearGradient colors={[AppColors.backgroundLight, AppColors.backgroundLight]} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <KeyboardScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            marginTop: '25%',
          }}
        >
          <View className="mb-5 mt-15 items-center justify-center">
            <View
              className="rounded-full p-5 items-center justify-center"
              style={{ backgroundColor: AppColors.primary }}
            >
              <Image
                source={require('@/assets/images/logo.png')}
                style={{
                  width: 45,
                  height: 45,
                }}
                resizeMode="contain"
              />
            </View>
          </View>

          <ThemedText type="title" className="font-bold text-white text-center mb-1">
            NutriAI
          </ThemedText>
          <ThemedText
            type="subtitle"
            className="!text-black/40 text-center mb-16"
          >
            Fuel your potential
          </ThemedText>

          <View className="w-full items-center mb-6">
            <TextInput
              ref={emailRef}
              label="Email Address"
              icon="email-outline"
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />

            <TextInput
              ref={passwordRef}
              label="Password"
              icon="lock-outline"
              placeholder="••••••••"
              secureTextEntry
              returnKeyType="done"
              submitBehavior="blurAndSubmit"
              autoComplete="password"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={() => passwordRef.current?.blur()}
            />

            <PrimaryButton
              title="Sign In"
              loading={loginLoading}
              onPress={handleLogin}
              className="mt-8"
            />
          </View>

          <View className="flex-row justify-center items-center mt-20">
            <ThemedText className="text-[15px] text-white/50">Don't have an account? </ThemedText>
            <TouchableOpacity onPress={() => router.push('/(public)/register')}>
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
