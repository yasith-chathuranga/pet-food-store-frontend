import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface SearchBarProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => {
    return (
        <div className="flex-1">
            <div className="flex items-center relative">
                <div className="pointer-events-none absolute pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] pl-10 pr-4 py-2 border-2 text-sm border-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>
        </div>
    );
};