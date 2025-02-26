import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import { saveDogFood, updateDogFood } from "../../reducers/DogFoodReducer.ts";
import { DogFood } from "../../models/DogFood.ts";

interface PetFoodFormProps {
    dogFood: DogFood | null;
    isViewMode: boolean;
    onClose: () => void;
}

export function DogFoodForm({ dogFood, isViewMode, onClose }: PetFoodFormProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (dogFood) {
            setId(dogFood.id);
            setName(dogFood.name);
            setDescription(dogFood.description);
            setPrice(dogFood.price);
            setStock(dogFood.stock);
            setImagePreview(dogFood.imagePath || null);
        }
    }, [dogFood]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClear = () => {
        setName("");
        setDescription("");
        setPrice(0);
        setStock(0);
        setImage(null);
        setImagePreview(null);
    };

    const handleSave = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("stock", stock.toString());

        if (image) {
            formData.append("image", image);
        }

        if (dogFood) {
            formData.append("id", id.toString());
            dispatch(updateDogFood(formData));
        } else {
            dispatch(saveDogFood(formData));
        }
        onClose();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSave();
    };return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl">
                <div className="bg-gray-900 text-white rounded-t-lg p-4 flex justify-between items-center">
                    <h2 className="font-bold text-2xl">
                        {isViewMode ? "View Dog Food" : dogFood ? "Update Dog Food" : "Add New Dog Food"}
                    </h2>
                    <button
                        className="px-6 py-2 text-white rounded"
                        type="button"
                        onClick={onClose}
                    >
                        <img src="/src/assets/icons/cancel-grey.svg" alt="close icon"/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-semibold text-primary">Dog Food Name</label>
                            <input
                                className="w-full p-2 border border-accent rounded"
                                type="text"
                                placeholder="e.g. Potato"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isViewMode}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-primary">Dog Food Description</label>
                            <input
                                className="w-full p-2 border border-accent rounded"
                                type="text"
                                placeholder="e.g. Solanum tuberosum"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                disabled={isViewMode}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-primary">Price</label>
                            <input
                                className="w-full p-2 border border-accent rounded"
                                type="number"
                                placeholder="e.g. 15.99"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                required
                                disabled={isViewMode}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-primary">Stock</label>
                            <input
                                className="w-full p-2 border border-accent rounded"
                                type="number"
                                placeholder="e.g. 100"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                required
                                disabled={isViewMode}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-primary">Dog Food Image</label>
                            {!isViewMode && (
                                <input
                                    className="w-full p-2 border border-accent rounded"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            )}{imagePreview && (
                            <div className="mt-4 border-2 border-dashed border-secondary p-2 flex justify-center items-center">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-md"
                                />
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        {!isViewMode && (
                            <>
                                <button
                                    className="px-6 py-2 w-32 bg-gray-400 text-white rounded hover:bg-gray-500"
                                    type="button"
                                    onClick={handleClear}
                                >
                                    Clear
                                </button>
                                <button
                                    className="px-6 py-2 w-32 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    type="submit"
                                >
                                    {dogFood ? "Update" : "Save"}
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}