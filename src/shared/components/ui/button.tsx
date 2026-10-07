import type { ButtonSize, ButtonVariant } from "@/shared/types/ui";
import { cn } from "@/shared/utils/cn";
import { Loader2 } from "lucide-react";
import { Slot } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";

const variantClassName: Record<ButtonVariant, string> = {
    primary:
        "bg-btn-primary-bg text-btn-primary-content hover:bg-btn-primary-hover-bg active:bg-btn-primary-active-bg disabled:cursor-not-allowed disabled:bg-btn-primary-disabled-bg disabled:text-btn-primary-disabled-content",
    secondary:
        "bg-btn-secondary-bg text-btn-secondary-content hover:bg-btn-secondary-hover-bg active:bg-btn-secondary-active-bg disabled:cursor-not-allowed disabled:bg-btn-secondary-disabled-bg disabled:text-btn-secondary-disabled-content",
    danger:
        "bg-btn-danger-bg text-btn-danger-content hover:bg-btn-danger-hover-bg active:bg-btn-danger-active-bg disabled:cursor-not-allowed disabled:bg-btn-danger-disabled-bg disabled:text-btn-danger-disabled-content",
    outline:
        "bg-btn-outline-bg border border-btn-outline-border text-btn-outline-content hover:bg-btn-outline-hover-bg hover:text-btn-outline-hover-content active:bg-btn-outline-active-bg disabled:cursor-not-allowed disabled:border-btn-outline-disabled-border disabled:text-btn-outline-disabled-content",
    link: "bg-btn-link-bg h-auto px-0 text-btn-link-content hover:opacity-80 disabled:text-btn-link-disabled-content",
    success:
        "bg-btn-success-bg text-btn-success-content hover:bg-btn-success-hover-bg active:bg-btn-success-active-bg disabled:cursor-not-allowed disabled:bg-btn-success-disabled-bg disabled:text-btn-success-disabled-content",
    highlight:
        "bg-linear-to-r from-btn-highlight-bg to-btn-highlight-to text-btn-highlight-content hover:from-btn-highlight-hover-bg hover:to-btn-highlight-hover-bg disabled:cursor-not-allowed disabled:from-btn-highlight-disabled-bg disabled:to-btn-highlight-disabled-bg disabled:text-btn-primary-disabled-content",
};

const sizeClassName: Record<ButtonSize, string> = {
    icon: "w-9 h-9 rounded-xl",
    sm: "h-8 px-3 text-xs",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-6 text-sm",
    full: "w-full h-12 sm:h-11 px-6 text-sm",
};

const iconSizeClassName: Record<ButtonSize, string> = {
    icon: "size-5",
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
    full: "size-5",
};

export type ButtonProps = ComponentProps<"button"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

export function Button({
    className,
    variant = "primary",
    size = "md",
    asChild = false,
    type = "button",
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot.Root : "button";
    const iconClassName = iconSizeClassName[size];

    return (
        <Comp
            {...(!asChild ? { type } : {})}
            disabled={disabled || isLoading}
            aria-busy={isLoading || undefined}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap",
                "transition-colors cursor-pointer select-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-ring",
                "disabled:pointer-events-none disabled:cursor-not-allowed",
                "[&_svg]:pointer-events-none [&_svg]:shrink-0",
                variantClassName[variant],
                sizeClassName[size],
                className,
            )}
            {...props}
        >
            {asChild ? (
                children
            ) : (
                <>
                    {isLoading ? (
                        <Loader2
                            className={cn(iconClassName, "animate-spin")}
                            aria-hidden
                        />
                    ) : leftIcon ? (
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
                    {!isLoading && children}
                    {!isLoading && rightIcon ? (
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
                </>
            )}
        </Comp>
    );
}
