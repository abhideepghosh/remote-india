"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="mt-8 flex gap-6 border-b border-slate-800 pb-4 text-sm sm:text-base">
            <Link
                href="/"
                className={cn(
                    "font-medium transition-colors hover:text-sky-400",
                    pathname === "/" || pathname.startsWith("/jobs")
                        ? "text-sky-400"
                        : "text-slate-400"
                )}
            >
                Jobs
            </Link>
            <Link
                href="/about"
                className={cn(
                    "font-medium transition-colors hover:text-sky-400",
                    pathname === "/about" ? "text-sky-400" : "text-slate-400"
                )}
            >
                About
            </Link>
        </nav>
    );
}
