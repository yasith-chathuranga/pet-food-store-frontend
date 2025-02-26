import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

interface SortDropdownProps {
    sortOrder: 'latest' | 'oldest';
    onSortChange: (order: 'latest' | 'oldest') => void;
}

export const SortDropdown = ({ sortOrder, onSortChange }: SortDropdownProps) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Sort by: {sortOrder === 'latest' ? 'Latest' : 'Oldest'}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => onSortChange('latest')}
                                    className={`${
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    } block px-4 py-2 text-sm w-full text-left flex items-center`}
                                >
                                    <ArrowUpIcon className="h-4 w-4 mr-2" />
                                    Latest
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => onSortChange('oldest')}
                                    className={`${
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    } block px-4 py-2 text-sm w-full text-left flex items-center`}
                                >
                                    <ArrowDownIcon className="h-4 w-4 mr-2" />
                                    Oldest
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};