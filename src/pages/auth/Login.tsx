import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import { useNavigate } from "react-router-dom";
import {login, resetState} from "../../reducers/authSlice.ts";


const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, success, error, userRole } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (success) {
            alert("Login successful!");

            if (userRole === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/user");
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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-semibold mb-4">Sign In</h2>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;