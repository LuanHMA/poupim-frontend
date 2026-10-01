import { cn } from "@/shared/utils/cn";

type PoupimMarkProps = {
    className?: string;
};

export function PoupimMark({ className }: PoupimMarkProps) {
    return (
        <svg viewBox="0 0 512 512" fill="none" aria-hidden className={cn("size-10 shrink-0", className)}>
            <rect width="512" height="512" rx="112" fill="#C8F047" />
            <path d="M180 210V378" stroke="#0A0A0A" strokeWidth="60" strokeLinecap="round" />
            <circle cx="256" cy="210" r="76" stroke="#0A0A0A" strokeWidth="60" />
            <path
                d="M256 184C259 201 265 207 282 210C265 213 259 219 256 236C253 219 247 213 230 210C247 207 253 201 256 184Z"
                fill="#0A0A0A"
            />
        </svg>
    );
}

type PoupimLogoProps = {
    className?: string;
    markClassName?: string;
    wordmarkClassName?: string;
};

export function PoupimLogo({ className, markClassName, wordmarkClassName }: PoupimLogoProps) {
    return (
        <span className={cn("inline-flex items-center gap-2.5", className)}>
            <PoupimMark className={markClassName} />
            <span
                aria-label="Poupim"
                className={cn(
                    "text-2xl font-extrabold leading-none tracking-tight text-content-primary",
                    wordmarkClassName,
                )}
            >
                <span aria-hidden>
                    poup
                    <span className="relative">
                        {/* Dotless "ı" so the dot can be drawn in the accent color */}
                        ı
                        <span className="absolute left-1/2 top-[0.26em] size-[0.18em] -translate-x-1/2 rounded-full bg-content-accent" />
                    </span>
                    m
                </span>
            </span>
        </span>
    );
}
