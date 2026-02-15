import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View, Modal, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { bottom } = useSafeAreaInsets()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editStep, setEditStep] = useState(1);
    
    const [name, setName] = useState('Alex Johnson');
    const [email, setEmail] = useState('alex.johnson@email.com');
    const [age, setAge] = useState('28');
    const [gender, setGender] = useState('Non-binary');
    const [height, setHeight] = useState('178');
    const [weight, setWeight] = useState('72.4');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [allergies, setAllergies] = useState<string[]>(['Peanuts', 'Shellfish', 'Dairy']);
    const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(['Vegetarian', 'Low Carb']);

    const predefinedAllergies = ['Peanuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy'];
    const predefinedPreferences = ['Weight Loss', 'Muscle Gain', 'General Health'];
    
    const toggleAllergy = (allergy: string) => {
        if (allergies.includes(allergy)) {
            setAllergies(allergies.filter(a => a !== allergy));
        } else {
            setAllergies([...allergies, allergy]);
        }
    };

    const toggleDietaryPreference = (pref: string) => {
        if (dietaryPreferences.includes(pref)) {
            setDietaryPreferences(dietaryPreferences.filter(p => p !== pref));
        } else {
            setDietaryPreferences([...dietaryPreferences, pref]);
        }
    };

    const bmi = (parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1);

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
                            
                            <View>
                                <ThemedText className="text-xl font-bold text-stone-900">{name}</ThemedText>
                                <ThemedText className="text-sm text-stone-600">{email}</ThemedText>
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
                        
                        <TouchableOpacity className="flex-row items-center justify-between p-4 bg-white border border-[#13EC5B]/20 rounded-xl">
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

            <Modal
                visible={isEditModalOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setIsEditModalOpen(false);
                    setEditStep(1);
                }}
            >
                <View className='flex-1 bg-black/50 justify-end'>
                    <View className="bg-white rounded-t-3xl max-h-[90%]" style={{ paddingBottom: bottom }}>
                        <View className="border-b border-[#13EC5B]/20 p-6 flex-row items-center justify-between">
                            <ThemedText className="text-2xl font-bold text-stone-900">Edit Profile</ThemedText>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsEditModalOpen(false);
                                    setEditStep(1);
                                }}
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
                                        <View className={`w-10 h-10 rounded-full items-center justify-center font-bold mb-2 ${
                                            editStep >= 1 ? 'bg-[#13EC5B]' : 'bg-stone-300'
                                        }`}>
                                            <ThemedText className={editStep >= 1 ? 'text-white font-bold' : 'text-stone-500 font-bold'}>1</ThemedText>
                                        </View>
                                        <ThemedText className={`text-xs font-medium ${editStep >= 1 ? 'text-[#13EC5B]' : 'text-stone-400'}`}>PERSONAL</ThemedText>
                                    </View>

                                    <View className={`w-16 h-0.5 mb-6 ${editStep >= 2 ? 'bg-[#13EC5B]/30' : 'bg-stone-300'}`}></View>

                                    <View className="flex-col items-center">
                                        <View className={`w-10 h-10 rounded-full items-center justify-center font-bold mb-2 ${
                                            editStep >= 2 ? 'bg-[#13EC5B]' : 'bg-stone-300'
                                        }`}>
                                            <ThemedText className={editStep >= 2 ? 'text-white font-bold' : 'text-stone-500 font-bold'}>2</ThemedText>
                                        </View>
                                        <ThemedText className={`text-xs font-medium ${editStep >= 2 ? 'text-[#13EC5B]' : 'text-stone-400'}`}>DIETARY</ThemedText>
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
                                                {['Male', 'Female', 'Other'].map((g) => (
                                                    <TouchableOpacity
                                                        key={g}
                                                        onPress={() => setGender(g)}
                                                        className={`flex-1 px-3 py-3 rounded-xl ${
                                                            gender === g ? 'bg-[#13EC5B]' : 'bg-white border border-[#13EC5B]/30'
                                                        }`}
                                                    >
                                                        <ThemedText className={`text-xs font-medium text-center ${
                                                            gender === g ? 'text-white' : 'text-stone-700'
                                                        }`}>{g}</ThemedText>
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
                                        <ThemedText className="text-sm font-semibold text-[#13EC5B] mb-3">FOOD ALLERGIES & INTOLERANCES</ThemedText>
                                        <View className="flex-row flex-wrap gap-2">
                                            {predefinedAllergies.map((allergy) => (
                                                <TouchableOpacity
                                                    key={allergy}
                                                    onPress={() => toggleAllergy(allergy)}
                                                    className={`px-4 py-2 rounded-full ${
                                                        allergies.includes(allergy)
                                                            ? 'border-2 border-[#13EC5B]'
                                                            : 'bg-white border border-[#13EC5B]/30'
                                                    }`}
                                                    style={allergies.includes(allergy) ? { backgroundColor: AppColors.primary + '33' } : {}}
                                                >
                                                    <ThemedText className={`text-sm font-medium ${
                                                        allergies.includes(allergy) ? 'text-[#13EC5B]' : 'text-stone-700'
                                                    }`}>{allergy}</ThemedText>
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
                                                    className={`px-4 py-2 rounded-full ${
                                                        dietaryPreferences.includes(pref)
                                                            ? 'border-2 border-[#13EC5B]'
                                                            : 'bg-white border border-[#13EC5B]/30'
                                                    }`}
                                                    style={dietaryPreferences.includes(pref) ? { backgroundColor: AppColors.primary + '33' } : {}}
                                                >
                                                    <ThemedText className={`text-sm font-medium ${
                                                        dietaryPreferences.includes(pref) ? 'text-[#13EC5B]' : 'text-stone-700'
                                                    }`}>{pref}</ThemedText>
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
                                        onPress={() => {
                                            setIsEditModalOpen(false);
                                            setEditStep(1);
                                        }}
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
        </SafeAreaView>
    );
}
