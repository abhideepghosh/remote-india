"use client";

import { Job } from "@/types/jobs";
import { useRouter } from "next/navigation";

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
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
        ? truncateWords(job.description, 15)
        : `${job.title} at ${job.company.name}`;

    return (
        <div
            onClick={handleCardClick}
            className="group flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm transition hover:border-sky-500/70 hover:shadow-lg md:p-5 cursor-pointer"
        >
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-white md:text-xl">
                    {job.title}
                </h3>
                <p className="text-xs text-slate-400">
                    {job.company.name}
                    {job.employmentTypes.length > 0 && ` · ${job.employmentTypes.join(" · ")}`}
                    {job.countries.length > 0 && ` · ${job.countries[0]}`}
                </p>
            </div>

            <p className="text-sm text-slate-300 line-clamp-2">{description}</p>

            <div className="mt-2 flex flex-wrap gap-2">
                {job.skills.slice(0, 5).map((skill) => (
                    <span
                        key={skill}
                        className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-sky-400"
                    >
                        {skill}
                    </span>
                ))}
                {job.skills.length > 5 && (
                    <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[0.7rem] font-medium text-slate-400">
                        +{job.skills.length - 5}
                    </span>
                )}
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-slate-800 pt-3">
                <span className="text-xs text-slate-500">
                    {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <button
                    onClick={handleApplyClick}
                    className="inline-flex items-center justify-center rounded-lg border border-sky-500 bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}
