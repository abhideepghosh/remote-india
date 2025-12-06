import { JobsListResponse, Job } from "@/types/jobs";

function getBaseUrl() {
    if (typeof window !== "undefined") return ""; // Browser should use relative url

    // Check for standard APP_URL (often used in generic hosting) or VERCEL_URL fallback
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

    return "http://localhost:3000"; // Localhost fallback
}

export async function fetchJobs(page: number, pageSize = 20): Promise<JobsListResponse> {
    const res = await fetch(`${getBaseUrl()}/api/jobs?page=${page}&pageSize=${pageSize}`);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
}

export async function searchJobs(q: string, page: number, pageSize = 20): Promise<JobsListResponse> {
    const params = new URLSearchParams({
        q,
        page: String(page),
        pageSize: String(pageSize),
    });

    const res = await fetch(`${getBaseUrl()}/api/jobs/search?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to search jobs");
    return res.json();
}

export async function fetchJobById(id: number): Promise<Job> {
    const baseUrl = getBaseUrl();
    try {
        const res = await fetch(`${baseUrl}/api/jobs/${id}`);
        if (res.ok) {
            return await res.json();
        }
    } catch (err) {
        console.warn(`Failed to fetch job ${id} directly, falling back to list search`, err);
    }

    // Fallback: fetch list and find job
    try {
        // Note: fallback uses same baseUrl
        const res = await fetch(`${baseUrl}/api/jobs?page=1&pageSize=100`);
        if (!res.ok) throw new Error("Failed to fetch jobs list for fallback");

        const data: JobsListResponse = await res.json();
        const job = data.jobs.find((j) => j.id === id);

        if (job) return job;
    } catch (err) {
        console.error("Fallback fetch failed", err);
    }

    throw new Error("Job not found");
}
