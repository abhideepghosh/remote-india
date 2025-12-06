"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Briefcase, Sparkles, Coffee, Code, Linkedin } from "lucide-react";

export default function AboutPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-8 space-y-12 pb-12"
        >
            {/* Hero Section */}
            <motion.section variants={item} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 mb-4">
                    <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
                    <span className="text-xs font-medium text-slate-300">
                        Crafted for Developers
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Freedom</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Remote India is more than just a job board. It's a gateway to a balanced life where your career and happiness coexist beautifully.
                </p>
            </motion.section>

            {/* Mission Cards */}
            <motion.section variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                    icon={<Heart className="w-6 h-6 text-rose-400" />}
                    title="Family First"
                    description="Prioritize what truly matters. Spend more time with loved ones while building a world-class career from home."
                />
                <Card
                    icon={<Globe className="w-6 h-6 text-emerald-400" />}
                    title="Work from Anywhere"
                    description="Whether it's a cozy home office or a beachside cafe, your workspace is wherever you feel most inspired."
                />
                <Card
                    icon={<Briefcase className="w-6 h-6 text-blue-400" />}
                    title="Global Opportunities"
                    description="Connect with top-tier companies worldwide that value your talent, not just your zip code."
                />
            </motion.section>

            {/* The Story / Personal Note */}
            <motion.section variants={item} className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8 md:p-12 shadow-2xl">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                            <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                                <Code className="w-6 h-6" />
                            </span>
                            <span>Built with Love & Code</span>
                        </h2>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-base md:text-lg">
                            <p>
                                Hello there! I'm <strong className="text-white">Abhideep Ghosh</strong>, a fellow Software Engineer who believes that geeks deserve the good life.
                            </p>
                            <p>
                                I built Remote India with a simple wish: to help talented developers like you escape the commute and find roles that respect your time and skills.
                                Whether you're looking to maximize your earning potential or simply want more time for staycations and hobbies, I hope this platform helps you find your happy place.
                            </p>
                            <div className="flex flex-col md:flex-row items-center gap-6 pt-2">
                                <p className="flex items-center justify-center md:justify-start gap-2 text-indigo-300 font-medium">
                                    <Coffee className="w-5 h-5" />
                                    <span>Here's to your next big adventure!</span>
                                </p>
                                <motion.a
                                    href="https://www.linkedin.com/in/abhideep-ghosh/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0077b5]/10 text-blue-400 border border-blue-400/20 hover:bg-[#0077b5]/20 hover:border-blue-400/40 transition-all duration-300 font-medium shadow-[0_0_15px_-3px_rgba(0,119,181,0.3)]"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    <span>Connect on LinkedIn</span>
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </motion.main>
    );
}

function Card({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.95 },
                show: { opacity: 1, scale: 1 },
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 transition-colors duration-300"
        >
            <div className="mb-4 inline-flex p-3 rounded-xl bg-slate-800 group-hover:bg-slate-700/80 transition-colors shadow-lg shadow-black/20 text-white">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
