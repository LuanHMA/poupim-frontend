import { cn } from "@/shared/utils/cn";

export function fieldControlClassName(error?: string) {
    return cn(
        "w-full h-11 rounded-xl border border-input-border bg-input-bg px-3 text-sm text-input-content sm:h-10",
        "placeholder:text-input-placeholder",
        "transition-colors outline-none",
        "focus:bg-input-focus-bg focus:border-input-focus-border focus:ring-2 focus:ring-input-focus-ring",
        "disabled:bg-input-disabled-bg disabled:border-input-disabled-border disabled:text-input-disabled-content disabled:cursor-not-allowed",
        error && "border-input-error-border focus:border-input-error-border",
    );
}
