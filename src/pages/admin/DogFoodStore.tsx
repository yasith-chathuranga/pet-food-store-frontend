import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/AuthReducer.ts";
import Navbar from "../../components/common/Navbar.tsx";
import { AddButton } from "../../components/common/AddButton.tsx";
import { AppDispatch, RootState } from "../../store/store.ts";
import { useEffect, useState } from "react";
import { DogFood } from "../../models/DogFood.ts";
import { deleteDogFood, getAllDogFoods } from "../../reducers/DogFoodReducer.ts";
import { DogFoodForm } from "../../components/dog_food/DogFoodForm.tsx";
import DogFoodCard from "../../components/dog_food/DogFoodCard.tsx";
import { Spinner } from "../../components/common/Spinner.tsx";
import { Dog } from "lucide-react";
import { Footer } from "../../components/common/Footer.tsx";
import {SearchBar} from "../../components/common/SearchBar.tsx";

export const DogFoodStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const dogFoods = useSelector((state: RootState) => state.dogFood);
    const [selectedDogFood, setSelectedDogFood] = useState<DogFood | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder] = useState<'latest' | 'oldest'>('latest');
    const [searchName, setSearchName] = useState('');

    const openModalForAdd = () => {
        setSelectedDogFood(null);
        setIsViewMode(false);
        setIsModalOpen(true);
    };

    const openModalForView = (dogFood: DogFood) => {
        setSelectedDogFood(dogFood);
        setIsViewMode(true);
        setIsModalOpen(true);
    };

    const openModalForEdit = (dogFood: DogFood) => {
        setSelectedDogFood(dogFood);
        setIsViewMode(false);
        setIsModalOpen(true);
    };

    const handleDelete = (dogFood: DogFood) => {
        const confirmation = window.confirm(`Are you sure you want to delete ${dogFood.name}?`);
        if (confirmation) {
            dispatch(deleteDogFood(dogFood.id));
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllDogFoods());
            setIsLoading(false);
        };
        fetchData().then(r => r);
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout())
            .unwrap() //
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                alert("An error occurred while logging out. Please try again.");
                console.log(error);
            });
    };

    // Sort dog foods based on the selected sortOrder
    const sortedDogFoods = [...dogFoods].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (sortOrder === 'latest') {
            return dateB.getTime() - dateA.getTime();
        } else {
            return dateA.getTime() - dateB.getTime();
        }
    });

    // Filter dog foods based on search query
    const filteredDogFoods = searchName
        ? sortedDogFoods.filter((dogFood) =>
            dogFood.name.toLowerCase().includes(searchName.toLowerCase())
        )
        : sortedDogFoods;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDogFoods.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <Navbar
                    navigationItems={[
                        { name: "Dog Food", href: "/admin/dog-food" },
                        { name: "Cat Food", href: "/admin/cat-food" },
                    ]}
                    logoText={"Logo"}
                    buttons={[
                        { text: "Log Out", onClick: handleLogout },
                    ]}
                />

                <div>
                    <div className="container mx-auto px-8 py-8">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center">
                                <Dog className="h-8 w-8 text-indigo-600" />
                                <p className="font-medium text-lg text-gray-900 ml-2">Dog Foods</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <SearchBar placeholder="Search by name" value={searchName} onChange={setSearchName} />
                                </div>
                                <AddButton onClick={openModalForAdd}>Add New Dog Food</AddButton>
                            </div>
                        </div>



                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Spinner size="lg" />
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {currentItems.length > 0 ? (
                                        currentItems.map((dogFood) => (
                                            <DogFoodCard
                                                key={dogFood.id}
                                                dogFood={dogFood}
                                                onView={openModalForView}
                                                onUpdate={openModalForEdit}
                                                onDelete={handleDelete}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-full flex flex-col items-center justify-center py-12">
                                            <img
                                                src="/src/assets/icons/empty-state.svg"
                                                alt="No dog foods available"
                                                className="w-48 h-48 mb-4"
                                            />
                                            <p className="text-lg text-gray-600">No dog foods available.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex justify-center mt-8">
                                    <nav className="inline-flex rounded-md shadow-sm">
                                        {Array.from({ length: Math.ceil(filteredDogFoods.length / itemsPerPage) }, (_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => paginate(i + 1)}
                                                className={`px-4 py-2 text-sm font-medium ${
                                                    currentPage === i + 1
                                                        ? "bg-gray-900 text-white"
                                                        : "bg-white text-blue-600 hover:bg-blue-50"
                                                } border border-gray-300 rounded-md mx-1`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </>
                        )}
                    </div>

                    {isModalOpen && (
                        <DogFoodForm
                            dogFood={selectedDogFood}
                            isViewMode={isViewMode}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
};