import { cn } from "@/shared/utils/cn";
import type { LucideIcon } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const ALL = "all";

export type TabOption<T extends string> = {
    value: T;
    label: string;
    icon: LucideIcon;
};

type SlidingTabsProps<T extends string> = {
    label: string;
    value: T;
    options: TabOption<T>[];
    onChange: (value: T) => void;
    bgColor?: string;
};

export function SlidingTabs<T extends string>({ label, value, options, onChange, bgColor = "bg-background-surface" }: SlidingTabsProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ x: 0, width: 0 });
    const [canAnimate, setCanAnimate] = useState(false);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const selected = container?.querySelector<HTMLElement>("[data-selected='true']");
        if (!container || !selected) return;

        setIndicator({ x: selected.offsetLeft, width: selected.offsetWidth });
        setCanAnimate(true);
    }, [value, options.length]);

    useEffect(() => {
        const measure = () => {
            const container = containerRef.current;
            const selected = container?.querySelector<HTMLElement>("[data-selected='true']");
            if (!container || !selected) return;
            setIndicator({ x: selected.offsetLeft, width: selected.offsetWidth });
        };

        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    return (
        <div className="space-y-2">
            <p className="text-sm font-medium text-content-primary">{label}</p>
            <div
                ref={containerRef}
                role="tablist"
                aria-label={label}
                className={cn("relative grid rounded-2xl p-1", bgColor)} 
                style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
            >
                <div
                    aria-hidden
                    className={cn(
                        "absolute top-1 bottom-1 z-0 rounded-xl bg-background-accent",
                        canAnimate && "transition-all duration-300 ease-out",
                    )}
                    style={{ left: indicator.x, width: indicator.width }}
                />
                {options.map((option) => {
                    const selected = option.value === value;
                    const Icon = option.icon;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            data-selected={selected ? "true" : "false"}
                            className={cn(
                                "relative z-10 flex cursor-pointer flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium transition-colors",
                                selected ? "text-content-inverse" : "text-content-muted",
                            )}
                            onClick={() => onChange(option.value)}
                        >
                            <Icon className="size-5" />
                            <span className="max-w-full truncate text-xs">{option.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
