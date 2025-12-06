"use client";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    isLoading?: boolean;
}

export function SearchBar({ value, onChange, isLoading }: SearchBarProps) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                    className="h-5 w-5 text-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <input
                type="text"
                className="block w-full rounded-lg border border-slate-700 bg-slate-900/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="Search for jobs (e.g. React, Node.js)..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {isLoading && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                        className="h-5 w-5 animate-spin text-sky-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
            )}
        </div>
    );
}
