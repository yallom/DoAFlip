import { Link } from "react-router-dom";
import { Flame, Drumstick, Wheat, Droplets } from "lucide-react";

export type RecipeType = "Breakfast" | "Lunch" | "Dinner" | "Snacks";

export interface Recipe {
    id: string;
    name: string;
    imageUrl: string;
    type: RecipeType;
    nutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
}

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const { name, imageUrl, type, nutrition } = recipe;

    return (
        <Link
            to={`/recipes/${recipe.id}`}
            className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary-green/20 bg-white shadow-sm transition-shadow hover:shadow-md"
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-primary-green/10">
                <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                    <h3 className="text-lg font-semibold text-dark-green-2">{name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-primary-green" />
                        <span className="text-dark-green-2">{nutrition.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Drumstick className="h-4 w-4 text-primary-green" />
                        <span className="text-dark-green-2">{nutrition.protein}g protein</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wheat className="h-4 w-4 text-primary-green" />
                        <span className="text-dark-green-2">{nutrition.carbs}g carbs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-primary-green" />
                        <span className="text-dark-green-2">{nutrition.fat}g fat</span>
                    </div>
                </div>
            </div>
            {/*<span className="absolute bottom-4 right-4 rounded-full border border-primary-green/30 bg-primary-green/15 px-3 py-1 text-xs font-semibold text-dark-green-2">
                {type}
            </span>*/}
        </Link>
    );
};

export default RecipeCard;
