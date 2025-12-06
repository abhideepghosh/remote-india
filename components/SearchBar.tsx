import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    isLoading?: boolean;
}

export function SearchBar({ value, onChange, isLoading }: SearchBarProps) {
    return (
        <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input
                type="text"
                className="block w-full rounded-xl border border-slate-800 bg-slate-900/50 py-3.5 pl-11 pr-10 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500/50 focus:bg-slate-900/80 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
                placeholder="Search for jobs (e.g. React, Node.js)..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {isLoading && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                </div>
            )}
        </div>
    );
}
