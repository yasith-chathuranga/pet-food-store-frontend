import { useState } from "react";

interface NavigationItem {
    name: string;
    href: string;
}

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

interface HeaderProps {
    navigationItems: NavigationItem[];
    logoText?: string;
    className?: string;
    bgColor?: string;
    textColor?: string;
    buttons?: ButtonProps[];
}

const Navbar = ({
                    navigationItems,
                    logoText = "CrunchyPaws",
                    className = "",
                    bgColor = "bg-white",
                    textColor = "text-gray-700",
                    buttons = [],
                }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className={`${bgColor} ${className} drop-shadow-sm`}>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo (Left) */}
                    <div className="flex-shrink-0">
                        <span className={`${textColor} text-2xl font-serif font-bold`}>{logoText}</span>
                    </div>

                    {/* Navigation Items (Right) */}
                    <div className="hidden md:flex flex-1 justify-end space-x-6">
                        {navigationItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`${textColor} hover:bg-gray-100 w-28 px-3 py-2 rounded-3xl text-sm font-semibold transition-colors flex items-center justify-center`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Buttons (Far Right) */}
                    <div className="hidden md:flex items-center space-x-4 ml-6">
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.onClick}
                                className={button.className || "w-32 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"}
                            >
                                {button.text}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${textColor} hover:bg-gray-700 focus:outline-none`}
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                            <svg
                                className={`h-6 w-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navigationItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`${textColor} hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium`}
                        >
                            {item.name}
                        </a>
                    ))}

                    {/* Mobile Buttons */}
                    <div className="mt-2 space-y-2">
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.onClick}
                                className={`w-full ${button.className || "bg-blue-500 hover:bg-blue-100 text-white px-4 py-2 rounded-md"}`}
                            >
                                {button.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;