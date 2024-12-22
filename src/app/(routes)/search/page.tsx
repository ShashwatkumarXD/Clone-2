// 'use client'
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";

export default async function SearchPage({
    searchParams: { query },
}: {
    searchParams: { query: string },
}) {

    return (
        <div>
            <div className="max-w-md mx-auto">
                <SearchForm />
                <Suspense fallback="loading...">
                    <SearchResults query={query} />
                </Suspense>
            </div>
        </div>
    );
}