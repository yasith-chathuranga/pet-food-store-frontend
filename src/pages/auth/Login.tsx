import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import { Link, useNavigate } from "react-router-dom";
import { login, resetState } from "../../reducers/AuthReducer.ts";
import { Eye, EyeOff } from "react-feather";
import Navbar from "../../components/common/Navbar.tsx";
import { Footer } from "../../components/common/Footer.tsx";

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { loading, success, error, userRole } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (success) {
            alert("Login successful!");

            if (userRole === "ADMIN") {
                navigate("/admin/dog-food");
            } else {
                navigate("/user/dog-food");
            }
            dispatch(resetState());
        }
    }, [success, userRole, dispatch, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <div>
            <Navbar
                navigationItems={[
                    { name: "Home", href: "/" },
                    { name: "About Us", href: "/about" },
                ]}
                buttons={[
                    { text: "Log In", onClick: () => navigate("/login"), className: "w-32 hover:bg-gray-100 text-black border border-blue-600 px-4 py-2 rounded-md" },
                    { text: "Get Started", onClick: () => navigate("/signup") },
                ]}
            />

            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="flex flex-col md:flex-row w-full md:w-[1200px] md:h-[600px] max-w-6xl bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 rounded-3xl shadow-lg overflow-hidden">
                    <div
                        className="w-full md:w-1/2 h-96 md:h-auto bg-cover bg-center relative"
                        style={{ backgroundImage: `url(https://thumbs.dreamstime.com/b/cute-ginger-cat-looking-bowl-dry-food-shot-above-white-background-adorable-gazing-kibble-captured-against-backdrop-346219473.jpg)` }}
                    ></div>
                    <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                        <div className="max-w-md w-full mt-12 mb-12">
                            <h3 className="text-2xl font-medium tracking-wider text-center text-gray-800 mb-16">Log In</h3>

                            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder=" "
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="peer mt-1 block w-full px-3 py-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
                                        autoComplete="email"
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-3 pb-6 top-2 text-gray-700 font-medium text-sm transform -translate-y-1/2 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 transition-all"
                                    >
                                        Email
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder=" "
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="peer mt-1 block w-full px-3 py-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
                                        autoComplete="new-password"
                                        required
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-3 pb-6 top-2 text-gray-700 font-medium text-sm transform -translate-y-1/2 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 transition-all"
                                    >
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {loading ? "Signing in..." : "Login"}
                                    <img src="/src/assets/icons/btn-arrow-right.svg" alt="arrow to right icon" className="pl-2"/>
                                </button>
                                <p className="w-full flex justify-center text-gray-700 text-sm">
                                    Don't have an account?
                                    <Link className="ml-2 mr-2 font-normal text-sm text-blue-700 hover:text-blue-900" to="/signup">Sign Up</Link>
                                    Now
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;