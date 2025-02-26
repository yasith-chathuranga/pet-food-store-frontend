import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllDogFoods} from "../../reducers/DogFoodReducer.ts";
import {logout} from "../../reducers/AuthReducer.ts";
import Navbar from "../../components/common/Navbar.tsx";
import {SearchBar} from "../../components/common/SearchBar.tsx";
import {Dog} from "lucide-react";
import {Spinner} from "../../components/common/Spinner.tsx";
import DogFoodCard from "../../components/dog_food/DogFoodCard.tsx";
import {DogFoodForm} from "../../components/dog_food/DogFoodForm.tsx";
import {Footer} from "../../components/common/Footer.tsx";
import {DogFood} from "../../models/DogFood.ts";
import {SortDropdown} from "../../components/common/SortDropdown.tsx";

export const DogFoodUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const dogFoods = useSelector((state: RootState) => state.dogFood);
    const [selectedDogFood, setSelectedDogFood] = useState<DogFood | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest'); // state for sorting
    const [searchName, setSearchName] = useState('');

    const openModalForView = (dogFood: DogFood) => {
        setSelectedDogFood(dogFood);
        setIsViewMode(true);
        setIsModalOpen(true);
    };

    const handleSortChange = (order: 'latest' | 'oldest') => {
        setSortOrder(order);
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

    const sortedDogFoods = [...dogFoods].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (sortOrder === 'latest') {
            return dateB.getTime() - dateA.getTime();
        } else {
            return dateA.getTime() - dateB.getTime();
        }
    });

    const filteredDogFoods = searchName
        ? sortedDogFoods.filter((dogFood) =>
            dogFood.name.toLowerCase().includes(searchName.toLowerCase())
        )
        : sortedDogFoods;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDogFoods.slice(indexOfFirstItem, indexOfLastItem);

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
                                    currentItems.map((dogFood) => (
                                        <DogFoodCard
                                            key={dogFood.id}
                                            dogFood={dogFood}
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
                                        <p className="text-lg text-gray-600">No dog foods available.</p>
                                    </div>
                                )}
                            </div>
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
                <Footer />
            </div>
        </>
    );
};