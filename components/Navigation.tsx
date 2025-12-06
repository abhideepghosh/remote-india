"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navigation() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Jobs", isActive: (path: string) => path === "/" || path.startsWith("/jobs") },
        { href: "/about", label: "About", isActive: (path: string) => path === "/about" },
    ];

    return (
        <nav className="mt-8 flex gap-2 border-b border-slate-800/50 pb-4">
            {links.map((link) => {
                const active = link.isActive(pathname);
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                            active ? "text-indigo-300" : "text-slate-400 hover:text-indigo-200"
                        )}
                    >
                        {active && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-lg"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{link.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
