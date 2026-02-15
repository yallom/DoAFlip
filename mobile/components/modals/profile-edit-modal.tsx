import { useEffect, useState } from 'react';
import { Modal, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';

type ProfileEditModalProps = {
    visible: boolean;
    onClose: () => void;
    bottomInset?: number;
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    age: string;
    setAge: (value: string) => void;
    gender: string;
    setGender: (value: string) => void;
    height: string;
    setHeight: (value: string) => void;
    weight: string;
    setWeight: (value: string) => void;
    weightUnit: string;
    setWeightUnit: (value: string) => void;
    allergies: string[];
    setAllergies: (value: string[]) => void;
    dietaryPreferences: string[];
    setDietaryPreferences: (value: string[]) => void;
};

export function ProfileEditModal({
    visible,
    onClose,
    bottomInset = 0,
    name,
    setName,
    email,
    setEmail,
    age,
    setAge,
    gender,
    setGender,
    height,
    setHeight,
    weight,
    setWeight,
    weightUnit,
    setWeightUnit,
    allergies,
    setAllergies,
    dietaryPreferences,
    setDietaryPreferences,
}: ProfileEditModalProps) {
    const [editStep, setEditStep] = useState(1);

    const predefinedAllergies = ['Peanuts', 'Lactose', 'Soy', 'Seafood'];
    const predefinedPreferences = ['Weight Loss', 'Muscle Gain', 'General Health'];

    useEffect(() => {
        if (!visible) {
            setEditStep(1);
        }
    }, [visible]);

    const toggleAllergy = (allergy: string) => {
        if (allergies.includes(allergy)) {
            setAllergies(allergies.filter((item) => item !== allergy));
        } else {
            setAllergies([...allergies, allergy]);
        }
    };

    const toggleDietaryPreference = (pref: string) => {
        if (dietaryPreferences.includes(pref)) {
            setDietaryPreferences(dietaryPreferences.filter((item) => item !== pref));
        } else {
            setDietaryPreferences([...dietaryPreferences, pref]);
        }
    };

    const handleClose = () => {
        setEditStep(1);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <View className="flex-1 bg-black/50 justify-end">
                <View className="bg-white rounded-t-3xl max-h-[90%]" style={{ paddingBottom: bottomInset }}>
                    <View className="border-b border-[#13EC5B]/20 p-6 flex-row items-center justify-between">
                        <ThemedText className="text-2xl font-bold text-stone-900">Edit Profile</ThemedText>
                        <TouchableOpacity
                            onPress={handleClose}
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: AppColors.primary + '1A' }}
                        >
                            <MaterialCommunityIcons name="close" size={24} color={AppColors.textMuted} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="px-6 py-4">
                        <View className="mb-6">
                            <View className="flex-row items-center justify-center gap-4 mb-6">
                                <View className="flex-col items-center">
                                    <View
                                        className={`w-10 h-10 rounded-full items-center justify-center font-bold mb-2 ${editStep >= 1 ? 'bg-[#13EC5B]' : 'bg-stone-300'
                                            }`}
                                    >
                                        <ThemedText className={editStep >= 1 ? 'text-white font-bold' : 'text-stone-500 font-bold'}>
                                            1
                                        </ThemedText>
                                    </View>
                                    <ThemedText
                                        className={`!text-sm font-medium ${editStep >= 1 ? 'text-[#13EC5B]' : 'text-stone-400'}`}
                                    >
                                        PERSONAL
                                    </ThemedText>
                                </View>

                                <View
                                    className={`w-16 h-0.5 mb-6 ${editStep >= 2 ? 'bg-[#13EC5B]/30' : 'bg-stone-300'}`}
                                ></View>

                                <View className="flex-col items-center">
                                    <View
                                        className={`w-10 h-10 rounded-full items-center justify-center font-bold mb-2 ${editStep >= 2 ? 'bg-[#13EC5B]' : 'bg-stone-300'
                                            }`}
                                    >
                                        <ThemedText className={editStep >= 2 ? 'text-white font-bold' : 'text-stone-500 font-bold'}>
                                            2
                                        </ThemedText>
                                    </View>
                                    <ThemedText
                                        className={`!text-sm font-medium ${editStep >= 2 ? 'text-[#13EC5B]' : 'text-stone-400'}`}
                                    >
                                        DIETARY
                                    </ThemedText>
                                </View>
                            </View>

                            <View className="items-center">
                                <ThemedText className="text-xl font-bold text-stone-900 mb-1">
                                    {editStep === 1 ? 'Personal Information' : 'Dietary Preferences'}
                                </ThemedText>
                                <ThemedText className="text-sm text-stone-600">Step {editStep} of 2</ThemedText>
                            </View>
                        </View>

                        {editStep === 1 && (
                            <View className="gap-4">
                                <View>
                                    <ThemedText className="text-sm font-medium text-stone-700 mb-2">Full Name</ThemedText>
                                    <TextInput
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 bg-white border border-[#13EC5B]/30 rounded-xl text-stone-900"
                                        placeholderTextColor={AppColors.textMuted}
                                    />
                                </View>

                                <View>
                                    <ThemedText className="text-sm font-medium text-stone-700 mb-2">Email Address</ThemedText>
                                    <TextInput
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder="name@example.com"
                                        keyboardType="email-address"
                                        className="w-full px-4 py-3 bg-white border border-[#13EC5B]/30 rounded-xl text-stone-900"
                                        placeholderTextColor={AppColors.textMuted}
                                    />
                                </View>

                                <View className="flex-row gap-3">
                                    <View className="flex-1">
                                        <ThemedText className="text-sm font-medium text-stone-700 mb-2">Age</ThemedText>
                                        <TextInput
                                            value={age}
                                            onChangeText={setAge}
                                            keyboardType="numeric"
                                            className="w-full px-4 py-3 bg-white border border-[#13EC5B]/30 rounded-xl text-stone-900"
                                            placeholderTextColor={AppColors.textMuted}
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <ThemedText className="text-sm font-medium text-stone-700 mb-2">Gender</ThemedText>
                                        <View className="flex-row gap-2">
                                            {['Male', 'Female', 'Other'].map((value) => (
                                                <TouchableOpacity
                                                    key={value}
                                                    onPress={() => setGender(value)}
                                                    className={`flex-1 px-3 py-3 rounded-xl ${gender === value ? 'bg-[#13EC5B]' : 'bg-white border border-[#13EC5B]/30'
                                                        }`}
                                                >
                                                    <ThemedText
                                                        className={`text-xs font-medium text-center ${gender === value ? 'text-white' : 'text-stone-700'
                                                            }`}
                                                    >
                                                        {value}
                                                    </ThemedText>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>

                                <View className="flex-row gap-3">
                                    <View className="flex-1">
                                        <ThemedText className="text-sm font-medium text-stone-700 mb-2">Height (cm)</ThemedText>
                                        <TextInput
                                            value={height}
                                            onChangeText={setHeight}
                                            keyboardType="numeric"
                                            className="w-full px-4 py-3 bg-white border border-[#13EC5B]/30 rounded-xl text-stone-900"
                                            placeholderTextColor={AppColors.textMuted}
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <ThemedText className="text-sm font-medium text-stone-700 mb-2">Weight</ThemedText>
                                        <View className="relative">
                                            <TextInput
                                                value={weight}
                                                onChangeText={setWeight}
                                                keyboardType="numeric"
                                                className="w-full px-4 py-3 bg-white border border-[#13EC5B]/30 rounded-xl text-stone-900"
                                                placeholderTextColor={AppColors.textMuted}
                                            />
                                            <TouchableOpacity
                                                onPress={() => setWeightUnit(weightUnit === 'kg' ? 'lb' : 'kg')}
                                                className="absolute right-3 top-3"
                                            >
                                                <ThemedText className="text-sm font-medium text-[#13EC5B]">{weightUnit}</ThemedText>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}

                        {editStep === 2 && (
                            <View className="gap-6">
                                <View>
                                    <ThemedText className="text-sm font-semibold text-[#13EC5B] mb-3">
                                        FOOD ALLERGIES & INTOLERANCES
                                    </ThemedText>
                                    <View className="flex-row flex-wrap gap-2">
                                        {predefinedAllergies.map((allergy) => (
                                            <TouchableOpacity
                                                key={allergy}
                                                onPress={() => toggleAllergy(allergy)}
                                                className={`px-4 py-2 rounded-full ${allergies.includes(allergy)
                                                    ? 'border-2 border-[#13EC5B]'
                                                    : 'bg-white border border-[#13EC5B]/30'
                                                    }`}
                                                style={
                                                    allergies.includes(allergy)
                                                        ? { backgroundColor: AppColors.primary + '33' }
                                                        : {}
                                                }
                                            >
                                                <ThemedText
                                                    className={`text-sm font-medium ${allergies.includes(allergy) ? 'text-[#13EC5B]' : 'text-stone-700'
                                                        }`}
                                                >
                                                    {allergy}
                                                </ThemedText>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                <View>
                                    <ThemedText className="text-sm font-semibold text-[#13EC5B] mb-3">DIETARY PREFERENCES</ThemedText>
                                    <View className="flex-row flex-wrap gap-2">
                                        {predefinedPreferences.map((pref) => (
                                            <TouchableOpacity
                                                key={pref}
                                                onPress={() => toggleDietaryPreference(pref)}
                                                className={`px-4 py-2 rounded-full ${dietaryPreferences.includes(pref)
                                                    ? 'border-2 border-[#13EC5B]'
                                                    : 'bg-white border border-[#13EC5B]/30'
                                                    }`}
                                                style={
                                                    dietaryPreferences.includes(pref)
                                                        ? { backgroundColor: AppColors.primary + '33' }
                                                        : {}
                                                }
                                            >
                                                <ThemedText
                                                    className={`text-sm font-medium ${dietaryPreferences.includes(pref) ? 'text-[#13EC5B]' : 'text-stone-700'
                                                        }`}
                                                >
                                                    {pref}
                                                </ThemedText>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        )}

                        <View className="flex-row items-center justify-between pt-6 mt-6 border-t border-[#13EC5B]/20">
                            {editStep > 1 ? (
                                <TouchableOpacity
                                    onPress={() => setEditStep(editStep - 1)}
                                    className="flex-row items-center gap-2 px-6 py-3"
                                >
                                    <MaterialCommunityIcons name="arrow-left" size={20} color={AppColors.textMuted} />
                                    <ThemedText className="font-medium text-stone-700">Back</ThemedText>
                                </TouchableOpacity>
                            ) : (
                                <View></View>
                            )}

                            {editStep < 2 ? (
                                <TouchableOpacity
                                    onPress={() => setEditStep(editStep + 1)}
                                    className="flex-row items-center gap-2 px-8 py-3 rounded-xl ml-auto"
                                    style={{ backgroundColor: AppColors.primary }}
                                >
                                    <ThemedText className="font-semibold text-white">Continue</ThemedText>
                                    <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={handleClose}
                                    className="flex-row items-center gap-2 px-8 py-3 rounded-xl"
                                    style={{ backgroundColor: AppColors.primary }}
                                >
                                    <ThemedText className="font-semibold text-white">Save Changes</ThemedText>
                                    <MaterialCommunityIcons name="check" size={20} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
