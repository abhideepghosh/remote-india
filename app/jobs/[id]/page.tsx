import { getJobsData } from "@/lib/jobsCache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Users, Briefcase, Globe, Calendar, ArrowUpRight, CheckCircle2 } from "lucide-react";

// Next.js 15+ params are awaitable
type Props = {
    params: Promise<{ id: string }>;
};

import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const jobId = Number(id);
    const jobsData = await getJobsData();
    const job = jobsData.jobs.find((j) => j.id === jobId);

    if (!job) {
        return {
            title: "Job Not Found",
        };
    }

    return {
        title: job.title,
        description: `Apply for ${job.title} at ${job.company.name}. ${job.employmentTypes.join(", ")} job.`,
        openGraph: {
            title: `${job.title} at ${job.company.name}`,
            description: `Apply for ${job.title} at ${job.company.name}. Remote job opportunity.`,
            type: "article",
            publishedTime: job.createdAt,
            authors: [job.company.name],
        },
    };
}

export default async function JobDetailsPage({ params }: Props) {
    const { id } = await params;
    const jobId = Number(id);

    if (isNaN(jobId)) {
        notFound();
    }

    let job;
    try {
        const jobsData = await getJobsData();
        job = jobsData.jobs.find((j) => j.id === jobId);

        if (!job) {
            notFound();
        }
    } catch (error) {
        console.error(error);
        notFound();
    }

    if (!job) return null; // Should be handled by notFound() above, but for TS safety

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: job.description || `Job opportunity for ${job.title} at ${job.company.name}`,
        identifier: {
            "@type": "PropertyValue",
            name: job.company.name,
            value: job.id,
        },
        datePosted: job.createdAt,
        validThrough: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // Estimate 1 month validity
        employmentType: job.employmentTypes.map(t => t.toUpperCase().replace("-", "_")),
        hiringOrganization: {
            "@type": "Organization",
            name: job.company.name,
            // sameAs and logo are not available in the current API response
        },
        jobLocation: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                addressCountry: "IN", // Assuming remote jobs targetable to Indians or global
            },
        },
        jobLocationType: "TELECOMMUTE",
        // Salary not available in API response
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 pb-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Link
                href="/"
                className="group inline-flex items-center text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to jobs
            </Link>

            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-sm">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white md:text-4xl leading-tight">
                            {job.title}
                        </h1>
                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-indigo-400" />
                                <span className="font-semibold text-slate-200">{job.company.name}</span>
                            </div>

                            {job.company.linkedinSize && (
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-slate-500" />
                                    <span>{job.company.linkedinSize} employees</span>
                                </div>
                            )}

                            {job.employmentTypes.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-slate-500" />
                                    <span>{job.employmentTypes.join(" / ")}</span>
                                </div>
                            )}

                            {job.countries.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-slate-500" />
                                    <span>{job.countries.join(", ")}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-500" />
                                <time dateTime={job.createdAt}>
                                    Posted {new Date(job.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                            <span
                                key={skill}
                                className="inline-flex items-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 border-t border-slate-800/50 pt-8">
                        <h2 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            Job Description
                        </h2>

                        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                            <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-6 text-center mb-8">
                                <p className="mb-3 text-slate-200 font-medium">
                                    Ready to take the next step?
                                </p>
                                <p className="text-sm text-slate-400">
                                    The full description and application details are available on the company's official page.
                                </p>
                            </div>

                            {job.description && (
                                <div className="space-y-4">
                                    {job.description.split("\n").map((para, i) => (
                                        <p key={i} className="text-base/7 text-slate-300">
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end border-t border-slate-800/50 pt-6">
                        <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:-translate-y-0.5"
                        >
                            Apply for this role
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
