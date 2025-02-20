import {Link, useNavigate} from "react-router-dom";
import { Dog, Cat, ArrowRight } from 'lucide-react';
import Navbar from "../components/common/Navbar.tsx";
import {Footer} from "../components/common/Footer.tsx";

export function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar navigationItems={
                [
                    {name: "Home", href: "/"},
                    {name: "About", href: "/about"},
                ]
            }
                    buttons={
                        [
                            {text: "Log In", onClick: () => navigate("/login"), className: "w-32 hover:bg-gray-100 text-black border border-blue-600 px-4 py-2 rounded-md"},
                            {text: "Get Started", onClick: () => navigate("/signup")},
                        ]
                    }
            />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                            alt="Pet Food Store"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/50"/>
                    </div>

                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Premium Pet Food for<br/>Your Beloved Companions
                        </h1>
                        <p className="mt-6 max-w-2xl text-xl text-indigo-100">
                            Discover our carefully selected range of high-quality pet foods,
                            designed to keep your pets healthy and happy.
                        </p>
                        <div className="mt-10 flex space-x-4">
                            <Link
                                to="/signup"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5"/>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 cursor-default">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                        Shop by Pet Category
                    </h2>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                        <div
                            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div
                                className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                <Dog className="h-6 w-6 text-indigo-600"/>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Dog Food</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Premium nutrition for your canine companion
                            </p>
                        </div>

                        <div
                            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div
                                className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                <Cat className="h-6 w-6 text-indigo-600"/>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Cat Food</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Delicious meals for your feline friend
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quality Promise Section */}
                <div className="bg-indigo-50">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Our Quality Promise
                            </h2>
                            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                                We carefully select and verify all our products to ensure your pets receive
                                the highest quality nutrition they deserve.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900">Premium Ingredients</h3>
                                <p className="mt-2 text-gray-500">
                                    All our products are made with high-quality, nutritious ingredients.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900">Quality Control</h3>
                                <p className="mt-2 text-gray-500">
                                    Rigorous testing ensures the safety and quality of every product.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900">Expert Selection</h3>
                                <p className="mt-2 text-gray-500">
                                    Our products are chosen by pet nutrition experts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}