import { Link, useParams } from "react-router-dom";
import { Flame, Drumstick, Wheat, Droplets } from "lucide-react";

const placeholderImage = "https://placehold.co/1200x700/13EC5B/1E352F?text=Recipe";

type RecipeData = {
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    nutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
    imageUrl: string;
};

const recipesById: Record<string, RecipeData> = {
    "1": {
        id: "1",
        name: "Avocado Egg Toast",
        description:
            "Creamy avocado, soft eggs, and toasted sourdough with a bright lemon finish. Simple, satisfying, and ready in minutes.",
        ingredients: [
            "2 slices sourdough bread",
            "1 ripe avocado",
            "2 eggs",
            "1 tsp lemon juice",
            "Pinch of chili flakes",
            "Salt and pepper",
        ],
        nutrition: { calories: 420, protein: 18, carbs: 34, fat: 24 },
        imageUrl: placeholderImage,
    },
    "2": {
        id: "2",
        name: "Citrus Chicken Bowl",
        description:
            "Zesty chicken with brown rice, roasted vegetables, and a citrus vinaigrette for a fresh mid-day boost.",
        ingredients: [
            "6 oz chicken breast",
            "1 cup cooked brown rice",
            "1 cup roasted vegetables",
            "1 tbsp olive oil",
            "1 tbsp citrus vinaigrette",
        ],
        nutrition: { calories: 540, protein: 42, carbs: 48, fat: 20 },
        imageUrl: placeholderImage,
    },
};

const fallbackRecipe: RecipeData = {
    id: "0",
    name: "Recipe Preview",
    description:
        "This is a placeholder recipe template. Replace it with real data once the database is connected.",
    ingredients: [
        "Ingredient 1",
        "Ingredient 2",
        "Ingredient 3",
        "Ingredient 4",
    ],
    nutrition: { calories: 380, protein: 24, carbs: 32, fat: 14 },
    imageUrl: placeholderImage,
};

const RecipeDetailPage = () => {
    const { id } = useParams();
    const recipe = (id && recipesById[id]) || fallbackRecipe;

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 md:pt-10">
                <Link
                    to="/recipes"
                    className="text-sm font-medium text-dark-green-1 transition-colors hover:text-primary-green"
                >
                    Back to recipes
                </Link>

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
                                {recipe.description}
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
                            <div className="rounded-2xl border border-primary-green/20 bg-primary-green/5 p-5">
                                <h2 className="text-lg font-semibold text-dark-green-2">Ingredients</h2>
                                <ul className="mt-3 space-y-2 text-sm text-dark-green-1">
                                    {recipe.ingredients.map((ingredient) => (
                                        <li key={ingredient} className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-primary-green" />
                                            <span>{ingredient}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-primary-green/20 bg-white p-5">
                                <h2 className="text-lg font-semibold text-dark-green-2">Description</h2>
                                <p className="mt-3 text-sm text-dark-green-1">
                                    {recipe.description}
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
            </div>
        </div>
    );
};

export default RecipeDetailPage;
