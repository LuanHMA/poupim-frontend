import type { BadgeSize, BadgeVariant } from "@/shared/types/ui";
import { cn } from "@/shared/utils/cn";
import type { ComponentProps, ReactNode } from "react";

const variantClassName: Record<BadgeVariant, string> = {
    default: "bg-badge-default-bg text-badge-default-content",
    accent: "bg-badge-accent-bg text-badge-accent-content",
    success: "bg-badge-success-bg text-badge-success-content",
    danger: "bg-badge-danger-bg text-badge-danger-content",
    warning: "bg-badge-warning-bg text-badge-warning-content",
    info: "bg-badge-info-bg text-badge-info-content",
    outline: "border border-badge-outline-border bg-transparent text-badge-outline-content",
    muted: "bg-badge-muted-bg text-badge-muted-content",
};

const sizeClassName: Record<BadgeSize, string> = {
    sm: "h-5 px-1.5 text-[10px] gap-1",
    md: "h-6 px-2 text-xs gap-1",
    lg: "h-7 px-2.5 text-sm gap-1.5",
};

const iconSizeClassName: Record<BadgeSize, string> = {
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
};

export type BadgeProps = ComponentProps<"span"> & {
    variant?: BadgeVariant;
    size?: BadgeSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

export function Badge({
    className,
    variant = "default",
    size = "md",
    leftIcon,
    rightIcon,
    children,
    ...props
}: BadgeProps) {
    const iconClassName = iconSizeClassName[size];

    return (
        <span
            className={cn(
                "inline-flex w-fit items-center justify-center rounded-full font-medium whitespace-nowrap",
                "[&_svg]:pointer-events-none [&_svg]:shrink-0",
                variantClassName[variant],
                sizeClassName[size],
                className,
            )}
            {...props}
        >
            {leftIcon ? (
                <span
                    className={cn(
                        "inline-flex items-center justify-center [&_svg]:size-full",
                        iconClassName,
                    )}
                    aria-hidden
                >
                    {leftIcon}
                </span>
            ) : null}
            {children}
            {rightIcon ? (
                <span
                    className={cn(
                        "inline-flex items-center justify-center [&_svg]:size-full",
                        iconClassName,
                    )}
                    aria-hidden
                >
                    {rightIcon}
                </span>
            ) : null}
        </span>
    );
}
