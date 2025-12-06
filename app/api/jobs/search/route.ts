import { NextRequest, NextResponse } from "next/server";
import { getCachedJobsOrWait } from "@/lib/jobsCache";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const q = (searchParams.get("q") ?? "").trim();
        const page = Number(searchParams.get("page") ?? "1");
        const pageSize = Number(searchParams.get("pageSize") ?? "20");

        const safePage = Math.max(page, 1);
        const safePageSize = Math.max(pageSize, 1);

        const jobsData = await getCachedJobsOrWait();

        // Safety check if jobsData is null/empty for some reason
        if (!jobsData || !jobsData.jobs) {
            throw new Error("No job data available");
        }

        const allJobs = jobsData.jobs;

        let filtered = allJobs;

        if (q.length > 0) {
            const qLower = q.toLowerCase();
            filtered = allJobs.filter((job) => {
                const titleMatch = job.title.toLowerCase().includes(qLower);
                const skillsMatch = job.skills.some((skill) =>
                    skill.toLowerCase().includes(qLower)
                );
                return titleMatch || skillsMatch;
            });
        }

        const startIndex = (safePage - 1) * safePageSize;
        const endIndex = startIndex + safePageSize;
        const pageJobs = filtered.slice(startIndex, endIndex);
        const hasMore = endIndex < filtered.length;

        return NextResponse.json({
            jobs: pageJobs,
            totalCount: filtered.length,
            page: safePage,
            pageSize: safePageSize,
            hasMore,
        });
    } catch (error: any) {
        console.error("/api/jobs/search error:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to search jobs" }),
            { status: 500 }
        );
    }
}
