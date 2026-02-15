import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Alert, Image, TouchableOpacity, View, type TextInputProps as RNTextInputProps, type TextInput as RNTextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/buttons/primary-button';
import { TextInput } from '@/components/inputs/text-input';
import KeyboardScrollView from '@/components/scrollviews/keyboard-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { type AuthAllergy, type AuthGender, type AuthGoal } from '@/hooks/queries/auth';

export default function RegisterScreen() {
    const { register, registerLoading } = useAuth();
    const [step, setStep] = useState(1);

    // Step 1: Account
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Step 2: Personal
    const [age, setAge] = useState('25');
    const [gender, setGender] = useState('Male');
    const [height, setHeight] = useState('175');
    const [weight, setWeight] = useState('70');
    const [weightUnit, setWeightUnit] = useState('kg');

    // Step 3: Dietary
    const [allergies, setAllergies] = useState<string[]>([]);
    const [objective, setObjective] = useState('');

    const predefinedAllergies = ['Peanuts', 'Lactose', 'Soy', 'Seafood'];

    // Refs for inputs
    const emailRef = useRef<RNTextInput>(null);
    const passwordRef = useRef<RNTextInput>(null);
    const confirmPasswordRef = useRef<RNTextInput>(null);

    const numericInputProps = useMemo<RNTextInputProps>(
        () => ({
            keyboardType: 'numeric',
            returnKeyType: 'next',
        }),
        [],
    );

    const validatePassword = (pwd: string) => {
        const hasUppercase = /[A-Z]/.test(pwd);
        const hasLowercase = /[a-z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasMinLength = pwd.length >= 8;

        return {
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasMinLength,
            isValid: hasUppercase && hasLowercase && hasNumber && hasMinLength,
        };
    };

    const passwordValidation = validatePassword(password);
    const passwordsMatch = password === confirmPassword;

    const toggleAllergy = (allergy: string) => {
        if (allergies.includes(allergy)) {
            setAllergies(allergies.filter((a) => a !== allergy));
        } else {
            setAllergies([...allergies, allergy]);
        }
    };

    const mapAllergy = (allergy: string): AuthAllergy => {
        switch (allergy) {
            case 'Peanuts':
                return 'peanuts';
            case 'Lactose':
                return 'lactose';
            case 'Soy':
                return 'soy';
            default:
                return 'seafood';
        }
    };

    const handleRegister = async () => {
        // Basic validation
        if (!name || !email || !password || !age || !height || !weight || !gender || !objective) {
            Alert.alert('Preenche os dados', 'Todos os campos sao obrigatorios.');
            return;
        }

        const ageValue = Number(age);
        const heightValue = Number(height);
        const weightValue = Number(weight);

        if (Number.isNaN(ageValue) || Number.isNaN(heightValue) || Number.isNaN(weightValue)) {
            Alert.alert('Dados invalidos', 'Idade, altura e peso devem ser numeros.');
            return;
        }

        const mappedGender: AuthGender = gender === 'Female' ? 'Feminine' : 'Masculine';

        let mappedGoal: AuthGoal = 'maintenance';
        if (objective === 'weight-loss') mappedGoal = 'weight_loss';
        else if (objective === 'muscle-gain') mappedGoal = 'muscle_gain';

        const success = await register({
            name: name.trim(),
            email: email.trim(),
            password,
            age: ageValue,
            height: heightValue,
            weight: weightValue,
            gender: mappedGender,
            goal: mappedGoal,
            allergies: allergies.map(mapAllergy),
        });

        if (success) {
            router.replace('/(tabs)');
        }
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            handleRegister();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const isStep1Valid =
        name.trim() &&
        email.trim() &&
        password &&
        confirmPassword &&
        passwordValidation.isValid &&
        passwordsMatch;

    return (
        <LinearGradient colors={[AppColors.backgroundLight, AppColors.backgroundLight]} style={{ flex: 1 }}>
            <SafeAreaView className="flex-1">
                <KeyboardScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingTop: 20,
                        paddingBottom: 40,
                    }}
                >
                    <View className="items-center justify-center mb-6">
                        <View
                            className="rounded-full p-4 items-center justify-center mb-3"
                            style={{ backgroundColor: AppColors.primary }}
                        >
                            <Image
                                source={require('@/assets/images/logo.png')}
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <ThemedText type="title" className="font-bold text-center mb-1" style={{ color: '#1E352F' }}>
                            Create Account
                        </ThemedText>
                        <ThemedText type="default" className="text-center" style={{ color: AppColors.textMuted }}>
                            Step {step} of 3
                        </ThemedText>
                    </View>

                    <View className="flex-row items-center justify-center mb-8 px-4">
                        {[1, 2, 3].map((stepNum) => (
                            <View key={stepNum} className="flex-row items-center">
                                <View className="flex-col items-center">
                                    <View
                                        className="w-10 h-10 rounded-full items-center justify-center mb-1"
                                        style={{
                                            backgroundColor: step >= stepNum ? AppColors.primary : AppColors.backgroundLight,
                                            borderWidth: 2,
                                            borderColor: step >= stepNum ? AppColors.primary : AppColors.textMuted + '50',
                                        }}
                                    >
                                        <ThemedText
                                            className="font-bold !text-sm"
                                            style={{
                                                color: step >= stepNum ? '#FFFFFF' : AppColors.textMuted,
                                            }}
                                        >
                                            {stepNum}
                                        </ThemedText>
                                    </View>
                                    <ThemedText
                                        className="!text-sm font-medium"
                                        style={{
                                            color: step >= stepNum ? AppColors.primary : AppColors.textMuted,
                                        }}
                                    >
                                        {stepNum === 1 ? 'ACCOUNT' : stepNum === 2 ? 'PERSONAL' : 'DIETARY'}
                                    </ThemedText>
                                </View>
                                {stepNum < 3 && (
                                    <View
                                        className="h-0.5 mx-2 mb-6"
                                        style={{
                                            width: 40,
                                            backgroundColor: step > stepNum ? AppColors.primary + '50' : AppColors.textMuted + '30',
                                        }}
                                    />
                                )}
                            </View>
                        ))}
                    </View>

                    <View className="w-full mb-6">

                        {step === 1 && (
                            <>
                                <ThemedText className="text-lg font-bold mb-4" style={{ color: '#1E352F' }}>
                                    Account Information
                                </ThemedText>

                                <TextInput
                                    label="Full Name"
                                    icon="account-outline"
                                    placeholder="Enter your full name"
                                    autoCapitalize="words"
                                    returnKeyType="next"
                                    value={name}
                                    onChangeText={setName}
                                    onSubmitEditing={() => emailRef.current?.focus()}
                                />

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
                                    placeholder="Create a secure password"
                                    secureTextEntry
                                    returnKeyType="next"
                                    autoComplete="password"
                                    value={password}
                                    onChangeText={setPassword}
                                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                                />

                                {password && (
                                    <View className="mb-4 px-1">
                                        <ThemedText
                                            className="text-xs"
                                            style={{ color: passwordValidation.isValid ? '#10b981' : '#ef4444' }}
                                        >
                                            • At least 8 characters, 1 uppercase, 1 lowercase, and 1 number
                                        </ThemedText>
                                    </View>
                                )}

                                <TextInput
                                    ref={confirmPasswordRef}
                                    label="Confirm Password"
                                    icon="lock-check-outline"
                                    placeholder="Re-enter your password"
                                    secureTextEntry
                                    returnKeyType="done"
                                    submitBehavior="blurAndSubmit"
                                    autoComplete="password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />

                                {confirmPassword && !passwordsMatch && (
                                    <View className="mb-4 px-1">
                                        <ThemedText className="text-xs" style={{ color: '#ef4444' }}>
                                            • Passwords do not match
                                        </ThemedText>
                                    </View>
                                )}
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <ThemedText className="text-lg font-bold mb-4" style={{ color: '#1E352F' }}>
                                    Personal Information
                                </ThemedText>

                                <View className="flex-row gap-3 mb-4">
                                    <View className="flex-1">
                                        <ThemedText className="text-sm font-medium mb-2" style={{ color: AppColors.textMuted }}>
                                            Age
                                        </ThemedText>
                                        <TextInput
                                            placeholder="25"
                                            keyboardType="numeric"
                                            value={age}
                                            onChangeText={setAge}
                                            {...numericInputProps}
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <ThemedText className="text-sm font-medium mb-2" style={{ color: AppColors.textMuted }}>
                                            Gender
                                        </ThemedText>
                                        <View className="flex-row gap-2">
                                            {['Male', 'Female', 'Other'].map((g) => (
                                                <TouchableOpacity
                                                    key={g}
                                                    onPress={() => setGender(g)}
                                                    className="flex-1 py-3 rounded-xl items-center justify-center"
                                                    style={{
                                                        backgroundColor: gender === g ? AppColors.primary : AppColors.backgroundLight,
                                                        borderWidth: 1,
                                                        borderColor: gender === g ? AppColors.primary : AppColors.textMuted + '50',
                                                    }}
                                                >
                                                    <ThemedText
                                                        className="text-xs font-medium"
                                                        style={{
                                                            color: gender === g ? '#FFFFFF' : AppColors.textMuted,
                                                        }}
                                                    >
                                                        {g === 'Other' ? 'Oth' : g}
                                                    </ThemedText>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>

                                <View className="flex-row gap-3 mb-4">
                                    <View className="flex-1">
                                        <ThemedText className="text-sm font-medium mb-2" style={{ color: AppColors.textMuted }}>
                                            Height (cm)
                                        </ThemedText>
                                        <TextInput
                                            placeholder="175"
                                            keyboardType="numeric"
                                            value={height}
                                            onChangeText={setHeight}
                                            {...numericInputProps}
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <ThemedText className="text-sm font-medium mb-2" style={{ color: AppColors.textMuted }}>
                                            Weight
                                        </ThemedText>
                                        <View className="relative">
                                            <TextInput
                                                placeholder="70"
                                                keyboardType="numeric"
                                                value={weight}
                                                onChangeText={setWeight}
                                                {...numericInputProps}
                                            />
                                            <TouchableOpacity
                                                onPress={() => setWeightUnit(weightUnit === 'kg' ? 'lb' : 'kg')}
                                                className="absolute right-3 top-4"
                                            >
                                                <ThemedText className="text-sm font-bold" style={{ color: AppColors.primary }}>
                                                    {weightUnit}
                                                </ThemedText>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View className="mb-4">
                                    <ThemedText className="text-sm font-medium mb-3" style={{ color: AppColors.textMuted }}>
                                        Food Allergies & Intolerances
                                    </ThemedText>
                                    <View className="flex-row flex-wrap gap-2">
                                        {predefinedAllergies.map((allergy) => (
                                            <TouchableOpacity
                                                key={allergy}
                                                onPress={() => toggleAllergy(allergy)}
                                                className="px-4 py-2 rounded-full"
                                                style={{
                                                    backgroundColor: allergies.includes(allergy)
                                                        ? AppColors.primary
                                                        : AppColors.backgroundLight,
                                                    borderWidth: 1,
                                                    borderColor: allergies.includes(allergy) ? AppColors.primary : AppColors.textMuted + '50',
                                                }}
                                            >
                                                <ThemedText
                                                    className="text-sm font-medium"
                                                    style={{
                                                        color: allergies.includes(allergy) ? '#FFFFFF' : AppColors.textMuted,
                                                    }}
                                                >
                                                    {allergy}
                                                </ThemedText>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <ThemedText className="text-lg font-bold mb-4" style={{ color: '#1E352F' }}>
                                    Dietary Preferences
                                </ThemedText>

                                <View className="mb-6">
                                    <ThemedText className="text-sm font-medium mb-3" style={{ color: AppColors.textMuted }}>
                                        What's your main health objective?
                                    </ThemedText>
                                    <View className="gap-3">
                                        {[
                                            {
                                                value: 'weight-loss',
                                                label: 'Weight Loss',
                                                desc: 'Reduce body weight with balanced nutrition',
                                                icon: 'weight',
                                            },
                                            {
                                                value: 'muscle-gain',
                                                label: 'Muscle Gain',
                                                desc: 'Build lean muscle with protein-rich diet',
                                                icon: 'arm-flex',
                                            },
                                            {
                                                value: 'health',
                                                label: 'General Health',
                                                desc: 'Improve overall health and wellness',
                                                icon: 'heart-pulse',
                                            },
                                        ].map((obj) => (
                                            <TouchableOpacity
                                                key={obj.value}
                                                onPress={() => setObjective(obj.value)}
                                                className="p-4 rounded-2xl flex-row items-center"
                                                style={{
                                                    backgroundColor:
                                                        objective === obj.value ? AppColors.primary + '15' : AppColors.backgroundLight,
                                                    borderWidth: 2,
                                                    borderColor: objective === obj.value ? AppColors.primary : AppColors.textMuted + '30',
                                                }}
                                            >
                                                <View
                                                    className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                                                    style={{
                                                        backgroundColor: objective === obj.value ? AppColors.primary : AppColors.textMuted + '20',
                                                    }}
                                                >
                                                    <MaterialCommunityIcons
                                                        name={obj.icon as any}
                                                        size={24}
                                                        color={objective === obj.value ? '#FFFFFF' : AppColors.textMuted}
                                                    />
                                                </View>
                                                <View className="flex-1">
                                                    <ThemedText
                                                        className="font-bold text-base mb-1"
                                                        style={{
                                                            color: objective === obj.value ? AppColors.primary : '#1E352F',
                                                        }}
                                                    >
                                                        {obj.label}
                                                    </ThemedText>
                                                    <ThemedText className="text-xs" style={{ color: AppColors.textMuted }}>
                                                        {obj.desc}
                                                    </ThemedText>
                                                </View>
                                                {objective === obj.value && (
                                                    <MaterialCommunityIcons name="check-circle" size={24} color={AppColors.primary} />
                                                )}
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            </>
                        )}
                    </View>

                    <View className="mt-4">
                        {step > 1 && (
                            <TouchableOpacity
                                onPress={handleBack}
                                className="flex-row items-center justify-center mb-3 py-2"
                            >
                                <MaterialCommunityIcons name="arrow-left" size={20} color={AppColors.textMuted} />
                                <ThemedText className="ml-2 font-medium" style={{ color: AppColors.textMuted }}>
                                    Back
                                </ThemedText>
                            </TouchableOpacity>
                        )}

                        <PrimaryButton
                            title={step === 3 ? 'Complete Registration' : 'Continue'}
                            onPress={handleNext}
                            disabled={(step === 1 && !isStep1Valid) || registerLoading}
                            loading={registerLoading && step === 3}
                        />
                    </View>

                    <View className="flex-row justify-center items-center mt-8">
                        <ThemedText className="text-sm" style={{ color: AppColors.textMuted }}>
                            Already have an account?{' '}
                        </ThemedText>
                        <TouchableOpacity onPress={() => router.push('/(public)')}>
                            <ThemedText className="text-sm font-semibold" style={{ color: AppColors.primary }}>
                                Sign In
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </KeyboardScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}
