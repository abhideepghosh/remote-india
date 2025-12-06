import { NextRequest, NextResponse } from "next/server";
import { getCachedJobsOrWait } from "@/lib/jobsCache";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return new NextResponse(
                JSON.stringify({ error: "Invalid ID" }),
                { status: 400 }
            );
        }

        const jobsData = await getCachedJobsOrWait();
        if (!jobsData || !jobsData.jobs) {
            return new NextResponse(
                JSON.stringify({ error: "Jobs data unavailable" }),
                { status: 503 }
            );
        }

        const job = jobsData.jobs.find((j) => j.id === id);

        if (!job) {
            return new NextResponse(
                JSON.stringify({ error: "Job not found" }),
                { status: 404 }
            );
        }

        return NextResponse.json(job);
    } catch (error: any) {
        console.error(`/api/jobs/${params.id} error:`, error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to get job details" }),
            { status: 500 }
        );
    }
}
