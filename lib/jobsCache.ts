import { JobsApiResponse } from "@/types/jobs";

// 2 days in seconds
const REVALIDATE_SECONDS = 2 * 24 * 60 * 60;

const UPSTREAM_JOBS_URL =
    "https://findmyremote.ai/api/jobs?employmentType=fulltime&location=in&category=software-development&category=front-end&category=back-end&category=full-stack&skill=react&skill=javascript&skill=angular&skill=angularjs&skill=nodejs&skill=expressjs&skill=mongodb&skill=mysql&skill=typescript&skill=css3&skill=html5";

export async function getJobsData(): Promise<JobsApiResponse> {
    try {
        // eslint-disable-next-line no-console
        console.log("Fetching jobs with caching...");
        const res = await fetch(UPSTREAM_JOBS_URL, {
            method: "GET",
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        });

        if (!res.ok) {
            throw new Error(`Upstream jobs API error: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();

        // Ensure the response matches our expected type and add 'cached' flag
        // The 'cached' flag here is a bit ambiguous with Next.js cache, 
        // but we'll include it to satisfy the type definition.
        // On Vercel, this fetch will use the Data Cache.
        return {
            ...json,
            cached: true
        } as JobsApiResponse;

    } catch (err) {
        console.error("Failed to fetch jobs from upstream:", err);
        throw err;
    }
}

// Alias for compatibility with existing code that expected different behavior
// In the new model, both functions do the same thing (fetch with revalidate)
export async function getCachedJobsOrWait(): Promise<JobsApiResponse> {
    return getJobsData();
}
