"use client";
import { useEffect, useRef, useState } from "react";
import { CustomCategory } from "../types";
import { CaetgorDropdown } from "./category-dropdown";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoriesSidebar } from "./categories-sidebar";

interface Props {
    data: CustomCategory[];
};

export const Categories = ({
    data,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const viewAllRef = useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibleCount] = useState(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState(false);
    const [isSidebarOpen, setIsSiderbarOpen] = useState(false);

    const activeCategory = "All";

    const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory);
    const isActiveCategoryHiddne = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

    useEffect(() => {
        const calculateVisible = () => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const avaiableWidth = containerWidth - viewAllWidth;

            const items = Array.from(measureRef.current.children);
            let totalWidth = 0;
            let visible = 0;

            for (const item of items) {
                const width = item.getBoundingClientRect().width

                if (totalWidth + width > avaiableWidth) break;
                totalWidth += width;
                visible++;
            };

            setVisibleCount(visible);
        };

        const resizeObserver = new ResizeObserver(calculateVisible);
        resizeObserver.observe(containerRef.current!);

        return () => resizeObserver.disconnect();
    }, [data.length]);

    return (
        <div className="relative w-full">

            <CategoriesSidebar
                open={isSidebarOpen}
                onOpenChange={setIsSiderbarOpen}
                data={data} />

            <div
                ref={measureRef}
                className="absolute opacity-0 pointer-events-none flex"
                style={{ position: "fixed", top: -9999, left: -9999 }}>
                {data.map((category) => (
                    <div key={category.id}>
                        <CaetgorDropdown
                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={false} />
                    </div>
                ))}
            </div>

            <div
                ref={containerRef}
                onMouseEnter={() => setIsAnyHovered(true)}
                onMouseLeave={() => setIsAnyHovered(false)}
                className="flex flex-nowrap items-center">
                {data.slice(0, visibleCount).map((category) => (
                    <div key={category.id}>
                        <CaetgorDropdown
                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={isAnyHovered} />
                    </div>
                ))}

                <div ref={viewAllRef} className="shrink-0">
                    <Button className={cn(
                        "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                        isActiveCategoryHiddne && !isAnyHovered && "bg-white border-primary"
                    )}
                        onClick={() => setIsSiderbarOpen(true)}>
                        View All
                        <ListFilterIcon className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}