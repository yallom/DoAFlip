import { useMemo, useState } from "react";
import RecipeCard, { Recipe, RecipeType } from "@/components/RecipeCard";

const placeholderImage = "https://placehold.co/600x400/13EC5B/1E352F?text=Recipe";

const recipes: Recipe[] = [
    {
        id: "1",
        name: "Avocado Egg Toast",
        imageUrl: placeholderImage,
        type: "Breakfast",
        nutrition: { calories: 420, protein: 18, carbs: 34, fat: 24 },
    },
    {
        id: "2",
        name: "Citrus Chicken Bowl",
        imageUrl: placeholderImage,
        type: "Lunch",
        nutrition: { calories: 540, protein: 42, carbs: 48, fat: 20 },
    },
    {
        id: "3",
        name: "Herb Salmon Plate",
        imageUrl: placeholderImage,
        type: "Dinner",
        nutrition: { calories: 610, protein: 46, carbs: 22, fat: 34 },
    },
    {
        id: "4",
        name: "Greek Yogurt Parfait",
        imageUrl: placeholderImage,
        type: "Snacks",
        nutrition: { calories: 260, protein: 20, carbs: 28, fat: 6 },
    },
    {
        id: "5",
        name: "Quinoa Veggie Power",
        imageUrl: placeholderImage,
        type: "Lunch",
        nutrition: { calories: 480, protein: 22, carbs: 64, fat: 14 },
    },
    {
        id: "6",
        name: "Berry Protein Smoothie",
        imageUrl: placeholderImage,
        type: "Breakfast",
        nutrition: { calories: 330, protein: 28, carbs: 38, fat: 8 },
    },
];

type FilterOption = "All" | RecipeType;

type OrderOption = "name-asc" | "calories-asc" | "protein-desc";

const RecipesPage = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterOption>("All");
    const [order, setOrder] = useState<OrderOption>("name-asc");

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
                                className="h-10 w-full min-w-[200px] rounded-full border border-primary-green/20 bg-white px-4 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
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
                                className="h-10 w-full min-w-[170px] rounded-full border border-primary-green/20 bg-white px-4 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
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
                                className="h-10 w-full min-w-[190px] rounded-full border border-primary-green/20 bg-white px-4 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                            >
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="calories-asc">Calories (Low-High)</option>
                                <option value="protein-desc">Protein (High-Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecipesPage;
