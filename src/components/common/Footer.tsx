import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">About Us</h3>
                        <p className="text-sm text-gray-400">
                            We are dedicated to providing premium pet food and care products for your beloved
                            companions.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-sm text-gray-400 hover:text-indigo-500 transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about"
                                   className="text-sm text-gray-400 hover:text-indigo-500 transition-colors">
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-indigo-500 transition-colors"
                            >
                                <Facebook className="h-6 w-6"/>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-indigo-500 transition-colors"
                            >
                                <Twitter className="h-6 w-6"/>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-indigo-500 transition-colors"
                            >
                                <Instagram className="h-6 w-6"/>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Pet Food Store. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}