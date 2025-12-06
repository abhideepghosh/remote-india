"use client";

import { Job } from "@/types/jobs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Calendar, Star, Building2, ArrowUpRight } from "lucide-react";

interface JobCardProps {
    job: Job;
    index?: number;
}

export function JobCard({ job, index = 0 }: JobCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/jobs/${job.id}`);
    };

    const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        window.open(job.url, "_blank", "noopener,noreferrer");
    };

    // Helper to truncate words
    const truncateWords = (str: string, maxWords: number) => {
        if (!str) return "";
        const words = str.split(" ");
        if (words.length <= maxWords) return str;
        return words.slice(0, maxWords).join(" ") + "...";
    };

    const description = job.description
        ? truncateWords(job.description, 20)
        : `${job.title} at ${job.company.name}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={handleCardClick}
            className="group relative flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
        >
            <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                            <span className="font-medium text-slate-300">{job.company.name}</span>
                        </div>
                        {job.countries.length > 0 && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                <span>{job.countries[0]}</span>
                            </div>
                        )}
                        {job.employmentTypes.length > 0 && (
                            <div className="flex items-center gap-1.5">
                                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                                <span>{job.employmentTypes[0]}</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* Optional: Company Logo Placeholder or Initials could go here */}
            </div>

            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 pl-0.5">
                {description}
            </p>

            <div className="flex flex-wrap gap-2">
                {job.skills.slice(0, 5).map((skill) => (
                    <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 group-hover:border-indigo-500/30 transition-colors"
                    >
                        {skill}
                    </span>
                ))}
                {job.skills.length > 5 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                        +{job.skills.length - 5}
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 mt-1">
                <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>

                <button
                    onClick={handleApplyClick}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
                >
                    Apply Now
                    <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </motion.div>
    );
}
