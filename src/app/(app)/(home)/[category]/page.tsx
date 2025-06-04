import { loadProductFilters } from "@/module/products/search-params";
import { ProductFilters } from "@/module/products/ui/components/product-filters";
import { ProductList, ProductListSkeleton } from "@/module/products/ui/components/product-list";
import { ProductSort } from "@/module/products/ui/components/product-sort";
import { ProductListView } from "@/module/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

interface Props {
    params: Promise<{
        category: string;
    }>,
    searchParams: Promise<SearchParams>
}

const Page = async ({ params, searchParams }: Props) => {
    const { category } = await params
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.products.getMany.queryOptions({
            category,
            ...filters
        }),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={category}/>
        </HydrationBoundary>
    );
};

export default Page;