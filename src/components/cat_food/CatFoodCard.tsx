import {CatFood} from "../../models/CatFood.ts";
import { Edit, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";

interface CatFoodCardProps {
    catFood: CatFood;
    onView?: (catFood: CatFood) => void;
    onUpdate?: (catFood: CatFood) => void;
    onDelete?: (catFood: CatFood) => void;
}

const CatFoodCard = ({ catFood, onView, onUpdate, onDelete }: CatFoodCardProps) => {
    const defaultImage = "path/to/default-image.jpg";
    const imageUrl = catFood.imagePath ? `http://localhost:3000/${catFood.imagePath.replace(/\\/g, '/')}` : defaultImage;

    const isOutOfStock = catFood.stock <= 0;
    const stockStatus = isOutOfStock ? "Out of Stock" : "In Stock";
    const stockColor = isOutOfStock ? "text-red-600" : "text-green-600";
    const stockIcon = isOutOfStock ? <XCircle className="w-5 h-5 bg text-red-600" /> : <CheckCircle className="w-5 h-5 text-green-600" />;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={catFood.name}
                    className="w-[240px] h-[200px] object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = defaultImage;
                    }}
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
                    #{catFood.id}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{catFood.name}</h3>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-600 font-bold">${catFood.price.toFixed(2)}</span>
                    <div className="flex items-center">
                        <span className={`text-sm font-medium ${stockColor}`}>{stockStatus}</span>
                        <span className="ml-2">{stockIcon}</span>
                    </div>
                </div>

                <div className="flex justify-between gap-2">
                    {onView && (
                        <button
                            onClick={() => onView(catFood)}
                            className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-md transition-colors duration-200 flex items-center justify-center"
                            title="View details"
                        >
                            <Eye size={18} />
                        </button>
                    )}
                    {onUpdate && (
                        <button
                            onClick={() => onUpdate(catFood)}
                            className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-md transition-colors duration-200 flex items-center justify-center"
                            title="Edit"
                        >
                            <Edit size={18} />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(catFood)}
                            className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-md transition-colors duration-200 flex items-center justify-center"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatFoodCard;