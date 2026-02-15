import { Flame, Drumstick, Wheat, Droplets, Search, X, Save } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { client } from "../lib/axios.config";

interface PlacedIngredient {
    id: string;
    x: number;
    y: number;
    quantity: number;
}

interface ingredient {
    id: string;
    savename: string;
    imageUrl: string;
    nutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    }
}

const placeholderIngredientImage = "https://placehold.co/120x120/13EC5B/1E352F?text=Item";

const RecipeBuilderPage = () => {
    const [search, setSearch] = useState("");
    const [quantity, setQuantity] = useState(100); // Default 100g
    const [selectedIngredients, setSelectedIngredients] = useState<PlacedIngredient[]>([]);
    const [allIngredients, setAllIngredients] = useState<ingredient[]>([]);
    const [recipeName, setRecipeName] = useState("");
    const [recipeSaved, setRecipeSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await client.get("/api/foods/")
            console.log(data)
            const formatted = data.data.map((d: any) => {
                return {
                    id: d.id,
                    name: d.name,
                    imageUrl: placeholderIngredientImage,
                    nutrition: {
                        calories: d.calories,
                        protein: d.protein,
                        carbs: d.carbs,
                        fat: d.fat
                    }
                }
            })
            setAllIngredients(formatted)
        }
        fetchData()
    }, [])

    const filteredIngredients = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        return allIngredients.filter((ingredient) =>
            ingredient.name.toLowerCase().includes(normalizedSearch)
        );
    }, [search, allIngredients]);

    const totals = useMemo(() => {
        return selectedIngredients.reduce(
            (acc, placed) => {
                const ingredient = allIngredients.find((ing) => ing.id === placed.id);
                if (ingredient) {
                    acc.calories += ingredient.nutrition.calories * (placed.quantity / 100);
                    acc.protein += ingredient.nutrition.protein * (placed.quantity / 100);
                    acc.carbs += ingredient.nutrition.carbs * (placed.quantity / 100);
                    acc.fat += ingredient.nutrition.fat * (placed.quantity / 100);
                }
                return acc;
            },
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
    }, [selectedIngredients, allIngredients]);

    const handleDragStart = (e: React.DragEvent, ingredientId: string) => {
        e.dataTransfer.effectAllowed = "copy";
        e.dataTransfer.setData("ingredientId", ingredientId);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const ingredientId = e.dataTransfer.getData("ingredientId");
        const container = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - container.left - 24; 
        const y = e.clientY - container.top - 24;
        
        if (ingredientId && !selectedIngredients.some((ing) => ing.id === ingredientId)) {
            setSelectedIngredients((prev) => [...prev, { id: ingredientId, x, y, quantity }]);
        }
    };

    const removeIngredient = (ingredientId: string) => {
        setSelectedIngredients((prev) => prev.filter((ing) => ing.id !== ingredientId));
    };

    const handleUpdateQuantity = (ingredientId: string, newQuantity: number) => {
        setSelectedIngredients((prev) =>
            prev.map((ing) =>
                ing.id === ingredientId ? { ...ing, quantity: Math.max(1, newQuantity) } : ing
            )
        );
    };

    const saveRecipe = async () => {
        if (!recipeName.trim()) {
            alert("Por favor, insira um nome para a receita");
            return;
        }

        if (selectedIngredients.length === 0) {
            alert("Por favor, adicione pelo menos um ingrediente");
            return;
        }

        setSaving(true);
        try {
            console.log("Criando receita com dados:", {
                name: recipeName,
                description: "",
                portions: 1,
                prep_time: 0,
                total_calories: Math.round(totals.calories),
                meal_id: null
            });

            // Criar receita
            const recipeResponse = await client.post("/api/recipes", {
                name: recipeName,
                description: "",
                portions: 1,
                prep_time: 0,
                total_calories: Math.round(totals.calories)
            });

            console.log("Receita criada com sucesso:", recipeResponse.data);
            const recipeId = recipeResponse.data.data.id;

            // Adicionar ingredientes à receita
            for (const ingredient of selectedIngredients) {
                console.log("Adicionando ingrediente:", {
                    recipe_id: recipeId,
                    food_id: ingredient.id,
                    quantity: ingredient.quantity
                });

                await client.post("/api/recipeingredients", {
                    recipe_id: recipeId,
                    food_id: ingredient.id,
                    quantity: ingredient.quantity
                });

                console.log("Ingrediente adicionado com sucesso:", ingredient.id);
            }

            setRecipeSaved(true);
            setRecipeName("");
            setSelectedIngredients([]);
            setTimeout(() => setRecipeSaved(false), 3000);
            alert("Receita guardada com sucesso!");
        } catch (error: any) {
            console.error("Erro completo ao guardar receita:", error);
            console.error("Dados da resposta do erro:", error.response?.data);
            console.error("Status do erro:", error.response?.status);
            console.error("Mensagem:", error.message);
            
            const errorMessage = error.response?.data?.message || error.message || "Erro desconhecido";
            alert(`Erro ao guardar receita: ${errorMessage}`);
        } finally {
            setSaving(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-12 pt-6 md:pt-10 lg:flex-row">
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold text-dark-green-2">Recipe Builder</h1>
                    <p className="mt-2 text-sm text-dark-green-1">
                        Build a custom recipe by grabbing ingredients on the right.
                    </p>
                    
                    <div 
                        className="mt-8 rounded-2xl border border-primary-green p-6 relative overflow-hidden"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{ minHeight: "400px" }}
                    >
                        {selectedIngredients.length === 0 ? (
                            <div>
                                <p className="text-sm text-primary-green">
                                    Drag ingredients here to add them to your recipe.
                                </p>
                                <p className="text-xs text-dark-green-1 mt-2">
                                    One serving = 100g. Adjust servings in the sidebar before dropping.
                                </p>
                            </div>
                        ) : (
                            selectedIngredients.map((placed) => {
                                const ingredient = allIngredients.find((ing) => ing.id === placed.id);
                                if (!ingredient) return null;
                                return (
                                    <div
                                        key={placed.id}
                                        className="absolute group"
                                        style={{ left: `${placed.x}px`, top: `${placed.y}px` }}
                                    >
                                        <div
                                            className="relative aspect-square rounded-lg bg-primary-green flex items-center justify-center p-2 cursor-move w-20 h-24"
                                        >
                                            <button
                                                onClick={() => removeIngredient(placed.id)}
                                                className="absolute -top-2 -right-2 rounded-full bg-dark-green-1 hover:bg-dark-green-1 transition-colors p-1 opacity-0 group-hover:opacity-100"
                                            >
                                                <X className="w-3 h-3 text-white" />
                                            </button>
                                            <div className="text-center flex flex-col gap-2 w-full">
                                                <p className="text-xs font-semibold text-dark-green-2 line-clamp-2">
                                                    {ingredient.name}
                                                </p>
                                                <input
                                                    type="number"
                                                    value={placed.quantity}
                                                    onChange={(e) => handleUpdateQuantity(placed.id, Number(e.target.value))}
                                                    className="w-full px-1 py-0.5 rounded border border-dark-green-2 text-xs text-center"
                                                    placeholder="g"
                                                    min="1"
                                                />
                                                <span className="text-xs text-dark-green-2">{placed.quantity}g</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <aside className="w-full lg:w-80">
                    <div className="rounded-3xl border border-primary-green/20 bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:flex lg:flex-col">
                        <div className="rounded-2xl border border-primary-green/20 bg-primary-green/5 p-4">
                            <h2 className="text-base font-semibold text-dark-green-2">Nutrition Summary</h2>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Flame className="h-4 w-4 text-primary-green" />
                                    <span className="text-dark-green-2">{Math.round(totals.calories)} kcal</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Drumstick className="h-4 w-4 text-primary-green" />
                                    <span className="text-dark-green-2">{Math.round(totals.protein)}g protein</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Wheat className="h-4 w-4 text-primary-green" />
                                    <span className="text-dark-green-2">{Math.round(totals.carbs)}g carbs</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Droplets className="h-4 w-4 text-primary-green" />
                                    <span className="text-dark-green-2">{Math.round(totals.fat)}g fat</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-1 flex-col">
                            <div className="flex items-end gap-3 mb-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-green-1" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search ingredients"
                                        className="w-full rounded-full border border-primary-green/20 bg-white py-2 pl-10 pr-4 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs font-semibold text-dark-green-2 mb-1">Quantity (g)</label>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                        min="1"
                                        step="10"
                                        className="w-20 rounded-full border border-primary-green/20 bg-white py-2 px-3 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 text-center"
                                    />
                                </div>
                            </div>
                            <div className="relative mb-4" style={{ display: 'none' }}>
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-green-1" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search ingredients"
                                    className="w-full rounded-full border border-primary-green/20 bg-white py-2 pl-10 pr-4 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                />
                            </div>

                            <h3 className="text-sm font-semibold text-dark-green-2">Ingredients</h3>
                            <div className="mt-3 max-h-96 overflow-y-auto space-y-3 pr-2">
                                {filteredIngredients.map((ingredient) => (
                                    <div
                                        key={ingredient.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, ingredient.id)}
                                        className={`flex items-center gap-3 rounded-2xl border p-3 cursor-grab active:cursor-grabbing transition-all ${
                                            selectedIngredients.some((ing) => ing.id === ingredient.id)
                                                ? "border-primary-green bg-primary-green/10"
                                                : "border-primary-green/15 bg-white hover:border-primary-green/30 hover:shadow-sm"
                                        }`}
                                    >
                                        <img
                                            src={ingredient.imageUrl}
                                            alt={ingredient.name}
                                            className="h-12 w-12 rounded-xl object-cover"
                                        />
                                        <span className="text-sm font-medium text-dark-green-2">{ingredient.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-col gap-3 pt-4 border-t border-primary-green/20">
                                <div className="flex flex-col">
                                    <label className="text-xs font-semibold text-dark-green-2 mb-2">Recipe Name</label>
                                    <input
                                        type="text"
                                        value={recipeName}
                                        onChange={(e) => setRecipeName(e.target.value)}
                                        placeholder="Enter recipe name..."
                                        className="w-full rounded-2xl border border-primary-green/20 bg-white py-2 px-4 text-sm text-dark-green-2 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                    />
                                </div>
                                <button
                                    onClick={saveRecipe}
                                    disabled={saving || selectedIngredients.length === 0}
                                    className="flex items-center justify-center gap-2 rounded-2xl bg-primary-green py-2 px-4 text-sm font-semibold text-white transition hover:bg-primary-green/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="h-4 w-4" />
                                    {saving ? "Saving..." : "Save Recipe"}
                                </button>
                                {recipeSaved && (
                                    <div className="rounded-2xl bg-primary-green/10 px-4 py-2 text-sm text-primary-green font-medium">
                                        ✓ Recipe saved successfully!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default RecipeBuilderPage;