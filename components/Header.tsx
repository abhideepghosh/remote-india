import Link from "next/link";

export function Header() {
    return (
        <header className="flex flex-col items-start gap-1">
            <Link href="/" className="group">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors">
                    Remote India
                </h1>
            </Link>
            <p className="text-sm sm:text-base text-slate-400">
                For Developers of all sorts!
            </p>
        </header>
    );
}
