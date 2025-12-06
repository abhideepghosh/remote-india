import Link from "next/link";
import { Rocket } from "lucide-react";

export function Header() {
    return (
        <header className="flex flex-col items-start gap-2 py-4">
            <Link href="/" className="group flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors border border-indigo-500/20">
                    <Rocket className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                    Remote <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 group-hover:from-indigo-300 group-hover:to-cyan-300 transition-all">India</span>
                </h1>
            </Link>
            <p className="text-sm sm:text-base text-slate-400 pl-1">
                For Developers of all sorts!
            </p>
        </header>
    );
}
