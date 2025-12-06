export interface Company {
    name: string;
    slug: string;
    linkedinSize: string | null;
}

export interface Job {
    id: number;
    slug: string;
    url: string;
    title: string;
    createdAt: string; // ISO date string
    employmentTypes: string[];
    countries: string[];
    skills: string[];
    company: Company;
    description?: string;
}

export interface JobsApiResponse {
    jobs: Job[];
    totalPages: number;
    totalCount: number;
    cached: boolean;
}

export interface JobsCache {
    lastFetchedAt: Date | null;
    data: JobsApiResponse | null;
    isFetching: boolean;
    fetchPromise: Promise<JobsApiResponse> | null;
}

export interface JobsListResponse {
    jobs: Job[];
    totalCount: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
