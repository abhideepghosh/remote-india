import { NextRequest, NextResponse } from "next/server";
import { getJobsData } from "@/lib/jobsCache";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page") ?? "1");
        // Limit max page size to avoid DOS
        const pageSize = Math.min(Number(searchParams.get("pageSize") ?? "20"), 100);

        const safePage = Math.max(page, 1);
        const safePageSize = Math.max(pageSize, 1);

        const jobsData = await getJobsData();
        const allJobs = jobsData.jobs;

        const startIndex = (safePage - 1) * safePageSize;
        const endIndex = startIndex + safePageSize;
        const pageJobs = allJobs.slice(startIndex, endIndex);

        const hasMore = endIndex < allJobs.length;

        return NextResponse.json({
            jobs: pageJobs,
            totalCount: allJobs.length,
            page: safePage,
            pageSize: safePageSize,
            hasMore,
            // Debug info:
            lastFetchedAt: jobsData.cached ? null : undefined,
        });
    } catch (error: any) {
        console.error("/api/jobs error:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to load jobs" }),
            { status: 500 }
        );
    }
}
