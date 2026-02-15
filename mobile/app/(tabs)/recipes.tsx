import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Image, ScrollView, TextInput, TouchableOpacity, View, Modal } from 'react-native';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type RecipeType = "Breakfast" | "Lunch" | "Dinner" | "Snacks";

interface Recipe {
    id: string;
    name: string;
    type: RecipeType;
    nutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
}

const recipes: Recipe[] = [
    {
        id: "1",
        name: "Avocado Egg Toast",
        type: "Breakfast",
        nutrition: { calories: 420, protein: 18, carbs: 34, fat: 24 },
    },
    {
        id: "2",
        name: "Citrus Chicken Bowl",
        type: "Lunch",
        nutrition: { calories: 540, protein: 42, carbs: 48, fat: 20 },
    },
    {
        id: "3",
        name: "Herb Salmon Plate",
        type: "Dinner",
        nutrition: { calories: 610, protein: 46, carbs: 22, fat: 34 },
    },
    {
        id: "4",
        name: "Greek Yogurt Parfait",
        type: "Snacks",
        nutrition: { calories: 260, protein: 20, carbs: 28, fat: 6 },
    },
    {
        id: "5",
        name: "Quinoa Veggie Power",
        type: "Lunch",
        nutrition: { calories: 480, protein: 22, carbs: 64, fat: 14 },
    },
    {
        id: "6",
        name: "Berry Protein Smoothie",
        type: "Breakfast",
        nutrition: { calories: 330, protein: 28, carbs: 38, fat: 8 },
    },
];

type FilterOption = "All" | RecipeType;
type OrderOption = "name-asc" | "calories-asc" | "protein-desc";

const getMealTypeImage = (type: RecipeType) => {
    switch (type) {
        case "Breakfast":
            return require('@/assets/images/breakfast.png');
        case "Lunch":
            return require('@/assets/images/lunch.png');
        case "Dinner":
            return require('@/assets/images/dinner.png');
        case "Snacks":
            return require('@/assets/images/snack.png');
        default:
            return require('@/assets/images/breakfast.png');
    }
};

const getMealTypeColor = (type: RecipeType) => {
    switch (type) {
        case "Breakfast":
            return "#fb923c"; // orange
        case "Lunch":
            return "#22c55e"; // green
        case "Dinner":
            return "#3b82f6"; // blue
        case "Snacks":
            return "#a855f7"; // purple
        default:
            return AppColors.primary;
    }
};

export default function RecipesScreen() {
    const { bottom } = useSafeAreaInsets();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterOption>("All");
    const [order, setOrder] = useState<OrderOption>("name-asc");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);

    const filteredRecipes = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        let result = recipes.filter((recipe) => {
            const matchesSearch = recipe.name.toLowerCase().includes(normalizedSearch);
            const matchesFilter = filter === "All" || recipe.type === filter;
            return matchesSearch && matchesFilter;
        });

        result = [...result].sort((a, b) => {
            if (order === "name-asc") {
                return a.name.localeCompare(b.name);
            }
            if (order === "calories-asc") {
                return a.nutrition.calories - b.nutrition.calories;
            }
            return b.nutrition.protein - a.nutrition.protein;
        });

        return result;
    }, [search, filter, order]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.backgroundLight }}>
            <ScrollView className="flex-1 px-4 pt-6">
                <View className="mb-6">
                    <ThemedText className="text-2xl font-semibold text-stone-900">Recipes</ThemedText>
                    <ThemedText className="mt-1 text-sm text-stone-600">
                        Browse your personalized meal ideas and nutrition details.
                    </ThemedText>
                </View>

                <View className="mb-6 gap-3">
                    <View>
                        <ThemedText className="text-xs font-medium text-stone-700 mb-2">Search</ThemedText>
                        <View className="relative">
                            <MaterialCommunityIcons 
                                name="magnify" 
                                size={20} 
                                color={AppColors.textMuted}
                                style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }}
                            />
                            <TextInput
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Search recipes"
                                placeholderTextColor={AppColors.textMuted}
                                className="h-12 w-full rounded-full border border-[#13EC5B]/20 bg-white pl-10 pr-4 text-sm text-stone-900"
                            />
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        <View className="flex-1">
                            <ThemedText className="text-xs font-medium text-stone-700 mb-2">Filter</ThemedText>
                            <View className="h-12 rounded-full border border-[#13EC5B]/20 bg-white justify-center px-4">
                                <TouchableOpacity
                                    onPress={() => setShowFilterModal(true)}
                                    className="flex-row items-center justify-between"
                                >
                                    <ThemedText className="text-sm text-stone-900">{filter}</ThemedText>
                                    <MaterialCommunityIcons name="chevron-down" size={20} color={AppColors.textMuted} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="flex-1">
                            <ThemedText className="text-xs font-medium text-stone-700 mb-2">Sort</ThemedText>
                            <View className="h-12 rounded-full border border-[#13EC5B]/20 bg-white justify-center px-4">
                                <TouchableOpacity
                                    onPress={() => setShowSortModal(true)}
                                    className="flex-row items-center justify-between"
                                >
                                    <ThemedText className="text-sm text-stone-900">
                                        {order === "name-asc" ? "Name" : order === "calories-asc" ? "Calories" : "Protein"}
                                    </ThemedText>
                                    <MaterialCommunityIcons name="chevron-down" size={20} color={AppColors.textMuted} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="gap-4 pb-6">
                    {filteredRecipes.map((recipe) => (
                        <TouchableOpacity
                            key={recipe.id}
                            activeOpacity={0.7}
                            className="bg-white rounded-2xl border border-[#13EC5B]/20 overflow-hidden"
                        >
                            <View className="relative">
                                <Image
                                    source={getMealTypeImage(recipe.type)}
                                    style={{ width: '100%', height: 200 }}
                                    resizeMode="cover"
                                />
                                <View
                                    className="absolute top-3 right-3 px-3 py-1.5 rounded-full"
                                    style={{ backgroundColor: getMealTypeColor(recipe.type) }}
                                >
                                    <ThemedText className="text-xs font-semibold text-white">
                                        {recipe.type}
                                    </ThemedText>
                                </View>
                            </View>

                            <View className="p-4">
                                <ThemedText className="text-lg font-bold text-stone-900 mb-3">
                                    {recipe.name}
                                </ThemedText>

                                <View className="gap-2">
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-1">
                                            <MaterialCommunityIcons name="fire" size={16} color={AppColors.primary} />
                                            <ThemedText className="text-xs text-stone-600">
                                                {recipe.nutrition.calories} kcal
                                            </ThemedText>
                                        </View>

                                        <View className="flex-row items-center gap-1">
                                            <MaterialCommunityIcons name="food-drumstick" size={16} color={AppColors.primary} />
                                            <ThemedText className="text-xs text-stone-600">
                                                {recipe.nutrition.protein}g protein
                                            </ThemedText>
                                        </View>
                                    </View>

                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-1">
                                            <MaterialCommunityIcons name="barley" size={16} color={AppColors.primary} />
                                            <ThemedText className="text-xs text-stone-600">
                                                {recipe.nutrition.carbs}g carbs
                                            </ThemedText>
                                        </View>

                                        <View className="flex-row items-center gap-1">
                                            <MaterialCommunityIcons name="water" size={16} color={AppColors.primary} />
                                            <ThemedText className="text-xs text-stone-600">
                                                {recipe.nutrition.fat}g fat
                                            </ThemedText>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {filteredRecipes.length === 0 && (
                    <View className="items-center justify-center py-12">
                        <MaterialCommunityIcons name="food-off" size={64} color={AppColors.textMuted} />
                        <ThemedText className="text-lg font-semibold text-stone-900 mt-4">No recipes found</ThemedText>
                        <ThemedText className="text-sm text-stone-600 mt-2">
                            Try adjusting your search or filters
                        </ThemedText>
                    </View>
                )}
            </ScrollView>

            <Modal
                visible={showFilterModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFilterModal(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white rounded-t-3xl pb-8" style={{ paddingBottom: bottom }}>
                        <View className="border-b border-[#13EC5B]/20 p-4 flex-row items-center justify-between">
                            <ThemedText className="text-lg font-bold text-stone-900">Filter by Meal Type</ThemedText>
                            <TouchableOpacity
                                onPress={() => setShowFilterModal(false)}
                                className="p-2"
                            >
                                <MaterialCommunityIcons name="close" size={24} color={AppColors.textMuted} />
                            </TouchableOpacity>
                        </View>
                        <View className="px-4 pt-4 gap-2">
                            {(["All", "Breakfast", "Lunch", "Dinner", "Snacks"] as FilterOption[]).map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => {
                                        setFilter(option);
                                        setShowFilterModal(false);
                                    }}
                                    className={`p-4 rounded-xl flex-row items-center justify-between ${
                                        filter === option ? 'bg-[#13EC5B]/10 border-2 border-[#13EC5B]' : 'bg-white border border-[#13EC5B]/20'
                                    }`}
                                >
                                    <ThemedText className={`text-base font-medium ${
                                        filter === option ? 'text-[#13EC5B]' : 'text-stone-900'
                                    }`}>{option}</ThemedText>
                                    {filter === option && (
                                        <MaterialCommunityIcons name="check" size={24} color={AppColors.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Sort Modal */}
            <Modal
                visible={showSortModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowSortModal(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white rounded-t-3xl pb-8">
                        <View className="border-b border-[#13EC5B]/20 p-4 flex-row items-center justify-between">
                            <ThemedText className="text-lg font-bold text-stone-900">Sort By</ThemedText>
                            <TouchableOpacity
                                onPress={() => setShowSortModal(false)}
                                className="p-2"
                            >
                                <MaterialCommunityIcons name="close" size={24} color={AppColors.textMuted} />
                            </TouchableOpacity>
                        </View>
                        <View className="px-4 pt-4 gap-2">
                            {[
                                { value: "name-asc" as OrderOption, label: "Name (A-Z)" },
                                { value: "calories-asc" as OrderOption, label: "Calories (Low-High)" },
                                { value: "protein-desc" as OrderOption, label: "Protein (High-Low)" }
                            ].map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    onPress={() => {
                                        setOrder(option.value);
                                        setShowSortModal(false);
                                    }}
                                    className={`p-4 rounded-xl flex-row items-center justify-between ${
                                        order === option.value ? 'bg-[#13EC5B]/10 border-2 border-[#13EC5B]' : 'bg-white border border-[#13EC5B]/20'
                                    }`}
                                >
                                    <ThemedText className={`text-base font-medium ${
                                        order === option.value ? 'text-[#13EC5B]' : 'text-stone-900'
                                    }`}>{option.label}</ThemedText>
                                    {order === option.value && (
                                        <MaterialCommunityIcons name="check" size={24} color={AppColors.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
