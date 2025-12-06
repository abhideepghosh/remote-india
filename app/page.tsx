"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { fetchJobs, searchJobs } from "@/lib/apiClient";
import { Job } from "@/types/jobs";
import { JobCard } from "@/components/JobCard";
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search-related
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchHasMore, setSearchHasMore] = useState(false);
  const [mode, setMode] = useState<"list" | "search">("list");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Initial load
  useEffect(() => {
    fetchJobs(1)
      .then((res) => {
        setJobs(res.jobs);
        setHasMore(res.hasMore);
      })
      .catch(() => setError("Failed to fetch jobs"))
      .finally(() => setIsInitialLoading(false));
  }, []);

  // Search debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim() === "") {
        if (mode === "search") {
          setMode("list");
          // Optionally reset list or just keep showing loaded jobs.
          // Ideally re-fetch or use cached initial jobs.
          // For simplicity, we re-fetch page 1 if coming back from search to ensure freshness
          // or we could store list state separately.
          setIsInitialLoading(true);
          fetchJobs(1)
            .then((res) => {
              setJobs(res.jobs);
              setHasMore(res.hasMore);
              setPage(1);
            })
            .catch(() => setError("Failed to fetch jobs"))
            .finally(() => setIsInitialLoading(false));
        }
        return;
      }

      setMode("search");
      setIsSearching(true);
      setSearchPage(1);

      searchJobs(searchQuery, 1)
        .then((res) => {
          setJobs(res.jobs);
          setSearchHasMore(res.hasMore);
        })
        .catch(() => setError("Failed to search jobs"))
        .finally(() => setIsSearching(false));
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]); // Removed 'mode' from deps to avoid loop, but need to be careful

  const loadMoreJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const res = await fetchJobs(nextPage);
      setJobs((prev) => [...prev, ...res.jobs]);
      setPage(nextPage);
      setHasMore(res.hasMore);
    } catch {
      setError("Failed to load more jobs");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const loadMoreSearchResults = useCallback(async () => {
    try {
      setIsSearching(true); // Reuse loading state or separate? search has its own logic
      // Actually we should use a separate loading state or reuse isLoading for scroll
      // but let's just reuse isLoading for the bottom spinner
      const nextPage = searchPage + 1;
      const res = await searchJobs(searchQuery, nextPage);
      setJobs((prev) => [...prev, ...res.jobs]);
      setSearchPage(nextPage);
      setSearchHasMore(res.hasMore);
    } catch {
      setError("Failed to load more results");
    } finally {
      setIsSearching(false);
    }
  }, [searchPage, searchQuery]);

  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;

        if (mode === "list" && hasMore && !isLoading && !isInitialLoading) {
          loadMoreJobs();
        } else if (mode === "search" && searchHasMore && !isSearching) {
          loadMoreSearchResults();
        }
      },
      { threshold: 0.1 } // small threshold
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [mode, hasMore, isLoading, searchHasMore, isSearching, isInitialLoading, loadMoreJobs, loadMoreSearchResults]);

  return (
    <div className="space-y-6">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        isLoading={isSearching && mode === "search" && searchPage === 1}
      />

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-200">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-sm underline hover:text-red-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {isInitialLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-40 w-full animate-pulse rounded-xl bg-slate-900"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}

          {jobs.length === 0 && !isSearching && !isLoading && (
            <div className="text-center py-10 text-slate-400">
              No jobs found.
            </div>
          )}

          <div ref={bottomRef} className="h-10 w-full">
            {(isLoading || (isSearching && searchPage > 1)) && (
              <div className="flex justify-center py-4">
                <span className="text-sm text-slate-400 animate-pulse">Loading more jobs...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
