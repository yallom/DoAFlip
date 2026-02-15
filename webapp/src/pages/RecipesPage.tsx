import { useMemo, useState, useEffect } from "react";
import RecipeCard, { Recipe, RecipeType } from "@/components/RecipeCard";
import axios from "axios";

const placeholderImage = "https://placehold.co/600x400/13EC5B/1E352F?text=Recipe";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5173/";

type FilterOption = "All" | RecipeType;

type OrderOption = "name-asc" | "calories-asc" | "protein-desc";

interface BackendRecipe {
    id: string;
    name: string;
    description: string | null;
    portions: number;
    prep_time: number;
    total_calories: number;
    meal_id: string;
    ingredients?: Array<{
        id: string;
        recipe_id: string;
        food_id: string;
        quantity: number;
        food?: {
            id: string;
            name: string;
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
        };
    }>;
}

interface RecipeIngredient {
    id: string;
    recipe_id: string;
    food_id: string;
    quantity: number;
    food?: {
        id: string;
        name: string;
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
}

interface Food {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

const RecipesPage = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterOption>("All");
    const [order, setOrder] = useState<OrderOption>("name-asc");
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Função para calcular os macronutrientes de uma receita
    const calculateRecipeNutrition = async (recipe: BackendRecipe): Promise<Recipe> => {
        try {
            let totalCalories = 0;
            let totalProtein = 0;
            let totalCarbs = 0;
            let totalFat = 0;

            // Se os ingredientes já vêm inclusos na resposta
            if (recipe.ingredients && recipe.ingredients.length > 0) {
                for (const ingredient of recipe.ingredients) {
                    if (ingredient.food) {
                        // Multiplicar pela quantidade (assumindo que quantity é em gramas ou porções)
                        totalCalories += ingredient.food.calories * (ingredient.quantity / 100);
                        totalProtein += ingredient.food.protein * (ingredient.quantity / 100);
                        totalCarbs += ingredient.food.carbs * (ingredient.quantity / 100);
                        totalFat += ingredient.food.fat * (ingredient.quantity / 100);
                    }
                }
            } else {
                // Se precisar fazer requisição para os ingredientes
                try {
                    const ingredientsResponse = await axios.get(
                        `${BACKEND_URL}/api/recipeingredient/recipe/${recipe.id}`
                    );
                    const ingredients: RecipeIngredient[] = ingredientsResponse.data.data || [];

                    for (const ingredient of ingredients) {
                        try {
                            // Buscar dados nutricionais do alimento
                            const foodResponse = await axios.get(
                                `${BACKEND_URL}/api/foods/${ingredient.food_id}`
                            );
                            const food: Food = foodResponse.data.data;

                            // Multiplicar pela quantidade (quantidade em gramas, nutrientes por 100g)
                            totalCalories += food.calories * (ingredient.quantity / 100);
                            totalProtein += food.protein * (ingredient.quantity / 100);
                            totalCarbs += food.carbs * (ingredient.quantity / 100);
                            totalFat += food.fat * (ingredient.quantity / 100);
                        } catch (foodError) {
                            console.error(`Erro ao buscar alimento ${ingredient.food_id}:`, foodError);
                        }
                    }
                } catch (ingredientsError) {
                    console.error(`Erro ao buscar ingredientes da receita ${recipe.id}:`, ingredientsError);
                }
            }

            // Determinar o tipo de refeição baseado no meal_id ou usar um padrão
            let recipeType: RecipeType = "Breakfast";
            if (recipe.meal_id) {
                // Se houver lógica específica para determinar o tipo pela meal_id, fazer aqui
                // Por enquanto, usar um mapeamento simples
                const mealTypeMap: { [key: string]: RecipeType } = {
                    // Ajustar conforme necessário
                };
                recipeType = (mealTypeMap[recipe.meal_id] || "Breakfast") as RecipeType;
            }

            return {
                id: recipe.id,
                name: recipe.name,
                imageUrl: placeholderImage,
                type: recipeType,
                nutrition: {
                    calories: Math.round(totalCalories),
                    protein: Math.round(totalProtein * 10) / 10,
                    carbs: Math.round(totalCarbs * 10) / 10,
                    fat: Math.round(totalFat * 10) / 10,
                },
            };
        } catch (err) {
            console.error("Erro ao calcular nutrição da receita:", err);
            return {
                id: recipe.id,
                name: recipe.name,
                imageUrl: placeholderImage,
                type: "Breakfast",
                nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
            };
        }
    };

    // Buscar receitas do backend
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${BACKEND_URL}/api/recipes`);
                const backendRecipes: BackendRecipe[] = response.data.data || [];

                // Processar cada receita para calcular macronutrientes
                const processedRecipes = await Promise.all(
                    backendRecipes.map((recipe) => calculateRecipeNutrition(recipe))
                );

                setRecipes(processedRecipes);
            } catch (err) {
                console.error("Erro ao buscar receitas:", err);
                setError("Erro ao carregar receitas. Por favor, tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

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
    }, [search, filter, order, recipes]);


    

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
                    <p className="text-dark-green-1">Loading recipes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-primary-green text-white rounded-full hover:bg-primary-green/90"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 md:pt-10">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-dark-green-2">Recipes</h1>
                        <p className="mt-1 text-sm text-dark-green-1">
                            Browse your personalized meal ideas and nutrition details.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-dark-green-1" htmlFor="recipe-search">
                                Search
                            </label>
                            <input
                                id="recipe-search"
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search recipes"
                                className="h-10 w-full min-w-50 rounded-full border border-primary-green/20 bg-white px-4 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-dark-green-1" htmlFor="recipe-filter">
                                Filter
                            </label>
                            <select
                                id="recipe-filter"
                                value={filter}
                                onChange={(event) => setFilter(event.target.value as FilterOption)}
                                className="h-10 w-full min-w-42.5 rounded-full border border-primary-green/20 bg-white px-4 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                            >
                                <option value="All">All</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snacks">Snacks</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-dark-green-1" htmlFor="recipe-order">
                                Order
                            </label>
                            <select
                                id="recipe-order"
                                value={order}
                                onChange={(event) => setOrder(event.target.value as OrderOption)}
                                className="h-10 w-full min-w-47.5 rounded-full border border-primary-green/20 bg-white px-4 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                            >
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="calories-asc">Calories (Low-High)</option>
                                <option value="protein-desc">Protein (High-Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {filteredRecipes.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-dark-green-1 text-lg">No recipes found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipesPage;
