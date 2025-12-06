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
    createdAt: string;
    employmentTypes: string[];
    countries: string[];
    skills: string[];
    company: Company;
    description?: string;
}

export interface JobsListResponse {
    jobs: Job[];
    totalCount: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
