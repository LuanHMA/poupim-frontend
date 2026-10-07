import { cn } from "@/shared/utils/cn";
import type { ComponentProps } from "react";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            aria-hidden
            className={cn("animate-pulse rounded-md bg-background-elevated", className)}
            {...props}
        />
    );
}
