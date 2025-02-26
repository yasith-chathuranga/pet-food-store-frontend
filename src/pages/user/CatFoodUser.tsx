import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/AuthReducer.ts";
import Navbar from "../../components/common/Navbar.tsx";
import { AppDispatch, RootState } from "../../store/store.ts";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/common/Spinner.tsx";
import {Cat} from "lucide-react";
import { Footer } from "../../components/common/Footer.tsx";
import {SearchBar} from "../../components/common/SearchBar.tsx";
import {CatFood} from "../../models/CatFood.ts";
import {getAllCatFoods} from "../../reducers/CatFoodReducer.ts";
import CatFoodCard from "../../components/cat_food/CatFoodCard.tsx";
import {CatFoodForm} from "../../components/cat_food/CatFoodForm.tsx";
import {SortDropdown} from "../../components/common/SortDropdown.tsx";

export const CatFoodUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const catFoods = useSelector((state: RootState) => state.catFood);
    const [selectedCatFood, setSelectedCatFood] = useState<CatFood | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
    const [searchName, setSearchName] = useState('');

    const openModalForView = (catFood: CatFood) => {
        setSelectedCatFood(catFood);
        setIsViewMode(true);
        setIsModalOpen(true);
    };

    const handleSortChange = (order: 'latest' | 'oldest') => {
        setSortOrder(order);
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllCatFoods());
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

    // Sort cat foods based on the selected sortOrder
    const sortedCatFoods = [...catFoods].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (sortOrder === 'latest') {
            return dateB.getTime() - dateA.getTime();
        } else {
            return dateA.getTime() - dateB.getTime();
        }
    });

    // Filter cat foods based on search query
    const filteredCatFoods = searchName
        ? sortedCatFoods.filter((catFood) =>
            catFood.name.toLowerCase().includes(searchName.toLowerCase())
        )
        : sortedCatFoods;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCatFoods.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <Navbar
                    navigationItems={[
                        { name: "Dog Food", href: "/user/dog-food" },
                        { name: "Cat Food", href: "/user/cat-food" },
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
                                <Cat className="h-8 w-8 text-indigo-600" />
                                <p className="font-medium text-lg text-gray-900 ml-2">Cat Foods</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <SearchBar placeholder="Search by name" value={searchName} onChange={setSearchName} />
                                </div>
                                <SortDropdown sortOrder={sortOrder} onSortChange={handleSortChange} />
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
                                        currentItems.map((catFood) => (
                                            <CatFoodCard
                                                key={catFood.id}
                                                catFood={catFood}
                                                onView={openModalForView}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-full flex flex-col items-center justify-center py-12">
                                            <img
                                                src="/src/assets/icons/empty-state.svg"
                                                alt="No dog foods available"
                                                className="w-48 h-48 mb-4"
                                            />
                                            <p className="text-lg text-gray-600">No cat foods available.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex justify-center mt-8">
                                    <nav className="inline-flex rounded-md shadow-sm">
                                        {Array.from({ length: Math.ceil(filteredCatFoods.length / itemsPerPage) }, (_, i) => (
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
                        <CatFoodForm
                            catFood={selectedCatFood}
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