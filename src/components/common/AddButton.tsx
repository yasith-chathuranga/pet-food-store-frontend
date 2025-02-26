interface AddButtonProps {
    onClick: () => void;
    children: string;
}

export function AddButton(props: AddButtonProps) {
    return (
        <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all duration-300
            w-full sm:w-56 md:w-52 lg:w-52 h-10 mt-2 mb-2"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}