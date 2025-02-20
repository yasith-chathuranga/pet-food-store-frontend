import React, { useState } from "react";
import Navbar from "../../components/common/Navbar.tsx";
import { Footer } from "../../components/common/Footer.tsx";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Loader, Package, PhoneCall, ShieldCheck, Users } from "lucide-react";

export function About() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                navigationItems={[
                    {name: "Home", href: "/"},
                    {name: "About", href: "/about"},
                ]}
                buttons={[
                    {
                        text: "Log In",
                        onClick: () => navigate("/login"),
                        className: "w-32 hover:bg-gray-100 text-black border border-blue-600 px-4 py-2 rounded-md"
                    },
                    {text: "Get Started", onClick: () => navigate("/signup")},
                ]}
            />

            {/*About Section*/}
            <section className="bg-gray-50 px-6 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">About</h2>
                    <p className="text-gray-600 mt-4">
                        Welcome to Pet Food Store, your trusted destination for high-quality pet nutrition.
                        We are dedicated to providing premium pet food that meets the nutritional needs of your furry friends.
                        Our mission is to ensure that every pet gets the best care through wholesome, healthy, and delicious food.
                    </p>
                </div>
            </section>

            {/*Features Section*/}
            <section className="bg-indigo-50 px-6 py-16">
                <div className="container mx-auto max-w-5xl text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
                        <Package className="text-blue-600 w-12 h-12 mb-4 animate-fadeIn"/>
                            <h3 className="text-xl font-semibold text-gray-700">Premium Quality</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                We source the best ingredients to ensure your pet gets high-quality nutrition.
                            </p>
                        </div>

                        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
                            <PhoneCall className="text-green-600 w-12 h-12 mb-4 animate-fadeIn"/>
                            <h3 className="text-xl font-semibold text-gray-700">24/7 Support</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                Our support team is available 24/7 to assist you with your pet food needs.
                            </p>
                        </div>
                    </div>

                    <div className="my-12 border-t border-gray-300 w-2/3 mx-auto"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
                            <ShieldCheck className="text-purple-600 w-12 h-12 mb-4 animate-fadeIn"/>
                            <h3 className="text-xl font-semibold text-gray-700">Trusted by Pet Owners</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                Thousands of happy customers trust us for their pet's nutrition.
                            </p>
                        </div>

                        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
                            <Users className="text-orange-600 w-12 h-12 mb-4 animate-fadeIn"/>
                            <h3 className="text-xl font-semibold text-gray-700">Our Mission</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                To provide healthy and nutritious food for pets while ensuring customer
                                satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/*Contact Section*/}
            <section className="bg-gray-50 px-6 py-10">
                <div className="container bg-white mx-auto rounded-xl shadow-xl p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
                            <p className="text-gray-700 mb-6">
                                Have questions or need assistance? Fill out the form below, and we'll get back to
                                you as soon as possible.
                            </p>

                            {/*Contact Information*/}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Mail className="text-blue-700" size={20}/>
                                    <span className="text-gray-700">petstore@gmail.com</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="text-blue-700" size={20}/>
                                    <span className="text-gray-700">+94 (71) 1234-567</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="text-blue-700" size={20}/>
                                    <span className="text-gray-700">123 Thawalama Road, Galle, Sri Lanka</span>
                                </div>
                            </div>
                        </div>

                        {/*Contact Form*/}
                        <div className="p-8">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="johndoe@example.com"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="How can we help you?"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-blue-900 transition duration-300 flex items-center justify-center"
                                >
                                    {loading ? <Loader className="animate-spin" size={20}/> : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}