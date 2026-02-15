import { Link, useParams } from "react-router-dom";
import { Flame, Drumstick, Wheat, Droplets } from "lucide-react";
import { useState, useEffect } from "react";
import { client } from "../lib/axios.config";

const placeholderImage = "https://placehold.co/1200x700/13EC5B/1E352F?text=Recipe";

type RecipeData = {
    id: string;
    name: string;
    description: string | null;
    ingredients: Array<{
        id: string;
        food_id: string;
        quantity: number;
        food: {
            name: string;
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
        };
    }>;
    nutrition: {
        calories: number; 
        protein: number;
        carbs: number;
        fat: number;
    };
    imageUrl: string;
};

const fallbackRecipe: RecipeData = {
    id: "0",
    name: "Recipe Preview",
    description:
        "This is a placeholder recipe template. Replace it with real data once the database is connected.",
    ingredients: [],
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    imageUrl: placeholderImage,
};

const RecipeDetailPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) {
                setRecipe(fallbackRecipe);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await client.get(`/api/recipes/${id}`);
                const recipeData = response.data.data;

                console.log("Dados da receita da API:", recipeData);
                console.log("Ingredientes:", recipeData.ingredients);

                // Calcular totais de nutrição
                let totalCalories = 0;
                let totalProtein = 0;
                let totalCarbs = 0;
                let totalFat = 0;

                recipeData.ingredients.forEach((ingredient: any) => {
                    if (!ingredient.food) {
                        console.warn("Ingrediente sem dados de food:", ingredient);
                        return;
                    }
                    const quantity = ingredient.quantity / 100; // Converter para porções de 100g
                    totalCalories += ingredient.food.calories * quantity;
                    totalProtein += ingredient.food.protein * quantity;
                    totalCarbs += ingredient.food.carbs * quantity;
                    totalFat += ingredient.food.fat * quantity;
                });

                const formattedRecipe: RecipeData = {
                    id: recipeData.id,
                    name: recipeData.name,
                    description: recipeData.description,
                    ingredients: recipeData.ingredients,
                    nutrition: {
                        calories: Math.round(totalCalories),
                        protein: Math.round(totalProtein),
                        carbs: Math.round(totalCarbs),
                        fat: Math.round(totalFat),
                    },
                    imageUrl: placeholderImage,
                };

                setRecipe(formattedRecipe);
            } catch (err) {
                console.error("Erro ao buscar receita:", err);
                setError("Erro ao carregar a receita");
                setRecipe(fallbackRecipe);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 md:pt-10">
                <Link
                    to="/recipes"
                    className="text-sm font-medium text-dark-green-1 transition-colors hover:text-primary-green"
                >
                    Back to recipes
                </Link>

                {loading && (
                    <div className="mt-8 text-center">
                        <p className="text-dark-green-1">Carregando receita...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-8 rounded-2xl bg-red-50 p-4 text-red-600">
                        <p>{error}</p>
                    </div>
                )}

                {recipe && (
                    <div className="mt-4 overflow-hidden rounded-3xl border border-primary-green/20 bg-white shadow-sm">
                        <div className="aspect-video w-full overflow-hidden bg-primary-green/10">
                            <img
                                src={recipe.imageUrl}
                                alt={recipe.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-8 p-6 md:p-10">
                            <div>
                                <h1 className="text-3xl font-semibold text-dark-green-2">{recipe.name}</h1>
                                <p className="mt-3 text-sm text-dark-green-1 md:text-base">
                                    {recipe.description || "Sem descrição disponível"}
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
                                <div className="rounded-2xl border border-primary-green/20 bg-primary-green/5 p-5">
                                    <h2 className="text-lg font-semibold text-dark-green-2">Ingredients</h2>
                                    <ul className="mt-3 space-y-2 text-sm text-dark-green-1">
                                        {recipe.ingredients.map((ingredient) => (
                                            <li key={ingredient.id} className="flex items-start gap-2">
                                                <span className="mt-1 h-2 w-2 rounded-full bg-primary-green" />
                                                <span>
                                                    {ingredient.quantity}g {ingredient.food.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-primary-green/20 bg-white p-5">
                                    <h2 className="text-lg font-semibold text-dark-green-2">Description</h2>
                                    <p className="mt-3 text-sm text-dark-green-1">
                                        {recipe.description || "Sem descrição disponível"}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-primary-green/20 bg-white p-5">
                                <h2 className="text-lg font-semibold text-dark-green-2">Macros</h2>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="flex items-center gap-3 rounded-xl border border-primary-green/15 bg-primary-green/5 p-4">
                                        <Flame className="h-5 w-5 text-primary-green" />
                                        <div>
                                            <p className="text-xs font-medium text-dark-green-1">Calories</p>
                                            <p className="text-base font-semibold text-dark-green-2">{recipe.nutrition.calories} kcal</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-xl border border-primary-green/15 bg-primary-green/5 p-4">
                                        <Drumstick className="h-5 w-5 text-primary-green" />
                                        <div>
                                            <p className="text-xs font-medium text-dark-green-1">Protein</p>
                                            <p className="text-base font-semibold text-dark-green-2">{recipe.nutrition.protein} g</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-xl border border-primary-green/15 bg-primary-green/5 p-4">
                                        <Wheat className="h-5 w-5 text-primary-green" />
                                        <div>
                                            <p className="text-xs font-medium text-dark-green-1">Carbs</p>
                                            <p className="text-base font-semibold text-dark-green-2">{recipe.nutrition.carbs} g</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-xl border border-primary-green/15 bg-primary-green/5 p-4">
                                        <Droplets className="h-5 w-5 text-primary-green" />
                                        <div>
                                            <p className="text-xs font-medium text-dark-green-1">Fat</p>
                                            <p className="text-base font-semibold text-dark-green-2">{recipe.nutrition.fat} g</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeDetailPage;
