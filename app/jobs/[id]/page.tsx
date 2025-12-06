import { fetchJobById } from "@/lib/apiClient";
import Link from "next/link";
import { notFound } from "next/navigation";

// Next.js 15+ params are awaitable
type Props = {
    params: Promise<{ id: string }>;
};

export default async function JobDetailsPage({ params }: Props) {
    const { id } = await params;
    const jobId = Number(id);

    if (isNaN(jobId)) {
        notFound();
    }

    let job;
    try {
        job = await fetchJobById(jobId);
    } catch (error) {
        console.error(error);
        notFound();
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-sky-400"
            >
                <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Back to jobs
            </Link>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white md:text-3xl">
                            {job.title}
                        </h1>
                        <div className="mt-2 text-sm text-slate-400">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="font-semibold text-slate-200">
                                    {job.company.name}
                                </span>
                                {job.company.linkedinSize && (
                                    <>
                                        <span>·</span>
                                        <span>{job.company.linkedinSize} employees</span>
                                    </>
                                )}
                                {job.employmentTypes.length > 0 && (
                                    <>
                                        <span>·</span>
                                        <span>{job.employmentTypes.join(" / ")}</span>
                                    </>
                                )}
                                {job.countries.length > 0 && (
                                    <>
                                        <span>·</span>
                                        <span>{job.countries.join(", ")}</span>
                                    </>
                                )}
                                <span>·</span>
                                <time dateTime={job.createdAt}>
                                    Posted {new Date(job.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                                Job ID: {job.id}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                            <span
                                key={skill}
                                className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-sky-400"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="mt-4 border-t border-slate-800 pt-6">
                        <h2 className="mb-4 text-lg font-semibold text-white">
                            Job Description
                        </h2>
                        <div className="prose prose-invert max-w-none text-slate-300">
                            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center mb-6">
                                <p className="mb-4 text-slate-300">
                                    The full description for this role is available on the company&apos;s
                                    application page.
                                </p>
                                <p className="text-sm text-slate-400">
                                    Click the <span className="font-semibold text-sky-400">&quot;Apply for this role&quot;</span> button below to view all details and submit your application.
                                </p>
                            </div>

                            {job.description && (
                                <div className="mt-6 space-y-4">
                                    {job.description.split("\n").map((para, i) => (
                                        <p key={i} className="leading-relaxed">
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end border-t border-slate-800 pt-6">
                        <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-lg border border-sky-500 bg-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            Apply for this role
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
