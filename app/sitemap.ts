import { MetadataRoute } from "next";
import { getJobsData } from "@/lib/jobsCache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Static routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];

    try {
        const { jobs } = await getJobsData();

        const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
            url: `${baseUrl}/jobs/${job.id}`,
            lastModified: new Date(job.createdAt),
            changeFrequency: "weekly",
            priority: 0.6,
        }));

        return [...routes, ...jobRoutes];
    } catch (error) {
        console.error("Failed to generate sitemap job routes:", error);
        return routes;
    }
}
