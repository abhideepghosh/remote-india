
async function test() {
    const baseUrl = "http://localhost:3000";
    console.log("Starting tests against", baseUrl);

    try {
        // 1. Fetch Jobs
        console.log("\n1. Testing GET /api/jobs...");
        const jobsRes = await fetch(`${baseUrl}/api/jobs`);
        if (!jobsRes.ok) throw new Error(`Jobs API failed: ${jobsRes.status}`);
        const jobsData = await jobsRes.json();
        console.log(`- Status: ${jobsRes.status}`);
        console.log(`- Count: ${jobsData.jobs?.length}`);
        console.log(`- Count: ${jobsData.jobs?.length}`);
        // console.log(`- Cached: ${jobsData.cached}`); // Can't easily verify Next.js internal cache state via API response alone

        console.log(`- HasMore: ${jobsData.hasMore}`);

        if (!jobsData.jobs || jobsData.jobs.length === 0) {
            console.warn("WARNING: No jobs returned. Upstream might be down or empty.");
        } else {
            console.log(`- Sample Job: ${jobsData.jobs[0].title}`);
        }

        // 2. Pagination
        console.log("\n2. Testing Pagination (Page 2)...");
        const p2Res = await fetch(`${baseUrl}/api/jobs?page=2&pageSize=5`);
        const p2Data = await p2Res.json();
        console.log(`- Count: ${p2Data.jobs?.length}`);
        console.log(`- Page: ${p2Data.page}`);

        // 3. Search
        console.log("\n3. Testing Search (q=react)...");
        const searchRes = await fetch(`${baseUrl}/api/jobs/search?q=react`);
        const searchData = await searchRes.json();
        console.log(`- Count: ${searchData.jobs?.length}`);
        const allReact = searchData.jobs?.every(j =>
            j.title.toLowerCase().includes('react') ||
            j.skills.some(s => s.toLowerCase().includes('react'))
        );
        console.log(`- Validation: ${allReact ? "All match 'react'" : "FAILED - Non-matching jobs found"}`);

        // 4. Job Details
        console.log("\n4. Testing Job Details...");
        if (jobsData.jobs && jobsData.jobs.length > 0) {
            const sampleId = jobsData.jobs[0].id;
            console.log(`- Fetching job ${sampleId}...`);
            const detailRes = await fetch(`${baseUrl}/api/jobs/${sampleId}`);
            if (!detailRes.ok) throw new Error(`Detail API failed: ${detailRes.status}`);
            const detailData = await detailRes.json();
            console.log(`- Title: ${detailData.title}`);
            console.log(`- Validation: ${detailData.id === sampleId ? "Passed" : "FAILED - ID mismatch"}`);
        } else {
            console.log("- Skipping (no jobs available)");
        }

        // 5. Job Details (Not Found)
        console.log("\n5. Testing 404...");
        const nfRes = await fetch(`${baseUrl}/api/jobs/999999999`);
        console.log(`- Status: ${nfRes.status} (Expected: 404)`);


    } catch (err) {
        console.error("Test Failed:", err);
        process.exit(1);
    }
}

test();
