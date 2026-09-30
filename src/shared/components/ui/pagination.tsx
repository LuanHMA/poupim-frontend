import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { cn } from "@/shared/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

type PageItem = number | "ellipsis-left" | "ellipsis-right";

function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getPageItems(page: number, totalPages: number, siblingCount = 1): PageItem[] {
    const maxVisibleItems = siblingCount * 2 + 5;
    if (totalPages <= maxVisibleItems) return range(1, totalPages);

    const leftSibling = Math.max(page - siblingCount, 1);
    const rightSibling = Math.min(page + siblingCount, totalPages);
    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;
    const edgeRangeLength = 3 + siblingCount * 2;

    if (!showLeftEllipsis) {
        return [...range(1, edgeRangeLength), "ellipsis-right", totalPages];
    }

    if (!showRightEllipsis) {
        return [1, "ellipsis-left", ...range(totalPages - edgeRangeLength + 1, totalPages)];
    }

    return [1, "ellipsis-left", ...range(leftSibling, rightSibling), "ellipsis-right", totalPages];
}

type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    pageSize?: number;
    siblingCount?: number;
    mobileSiblingCount?: number;
    disabled?: boolean;
    className?: string;
};

export function Pagination({
    page,
    totalPages,
    onPageChange,
    totalItems,
    pageSize,
    siblingCount = 1,
    mobileSiblingCount = 0,
    disabled = false,
    className,
}: PaginationProps) {
    const { isMobile } = useIsMobile({ limitScreenWidth: 767 });

    if (totalPages <= 1) return null;

    const isFirstPage = page <= 1;
    const isLastPage = page >= totalPages;

    const goTo = (nextPage: number) => {
        if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
        onPageChange(nextPage);
    };

    const hasSummary = totalItems != null && pageSize != null && totalItems > 0;
    const firstItem = (page - 1) * (pageSize ?? 0) + 1;
    const lastItem = Math.min(page * (pageSize ?? 0), totalItems ?? 0);

    return (
        <nav
            aria-label="Paginação"
            className={cn(
                "flex flex-col items-center gap-3 md:flex-row md:gap-4",
                hasSummary ? "md:justify-between" : "md:justify-end",
                className,
            )}
        >
            {hasSummary ? (
                <p className="text-sm text-content-muted  items-center gap-0.5 hidden sm:flex">
                    Mostrando <span className="font-medium text-content-primary">{firstItem}</span>–
                    <span className="font-medium text-content-primary">{lastItem}</span> de{" "}
                    <span className="font-medium text-content-primary">{totalItems}</span>
                </p>
            ) : null}

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="size-11"
                    aria-label="Página anterior"
                    disabled={disabled || isFirstPage}
                    onClick={() => goTo(page - 1)}
                >
                    <ChevronLeft className="size-4" />
                </Button>

                {getPageItems(page, totalPages, isMobile ? mobileSiblingCount : siblingCount).map((item) => {
                    if (typeof item !== "number") {
                        return (
                            <span key={item} aria-hidden className="grid size-11 place-items-center text-sm text-content-muted">
                                …
                            </span>
                        );
                    }

                    const isCurrent = item === page;

                    return (
                        <Button
                            key={item}
                            variant={isCurrent ? "primary" : "outline"}
                            size="icon"
                            className="size-11 text-sm"
                            aria-label={`Página ${item}`}
                            aria-current={isCurrent ? "page" : undefined}
                            disabled={disabled}
                            onClick={() => goTo(item)}
                        >
                            {item}
                        </Button>
                    );
                })}

                <Button
                    variant="outline"
                    size="icon"
                    className="size-11"
                    aria-label="Próxima página"
                    disabled={disabled || isLastPage}
                    onClick={() => goTo(page + 1)}
                >
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </nav>
    );
}
