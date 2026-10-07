import { Button } from "@/shared/components/ui";
import { useDragToDismiss } from "@/shared/hooks/use-drag-to-dismiss";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { cn } from "@/shared/utils/cn";
import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TransactionsCategoryFilter } from "./category-filter";
import { TransactionsClearFiltersButton } from "./clear-filters-button";
import { TransactionsStatusFilter } from "./status-filter";
import { TransactionsTypeFilter } from "./type-filter";

export function TransactionsFiltersDrawer({ onClose }: { onClose: () => void }) {
    const [isVisible, setIsVisible] = useState(false);
    const hasOpened = useRef(false);
    const { isMobile } = useIsMobile({ limitScreenWidth: 767 });
    const { setSheetRef, dragStyle, dragHandleProps, onDragTransitionEnd } = useDragToDismiss({
        axis: "y",
        onDismiss: onClose,
        active: isMobile,
    });

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            hasOpened.current = true;
            setIsVisible(true);
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (isVisible || !hasOpened.current) return;

        const timeout = window.setTimeout(onClose, 320);
        return () => window.clearTimeout(timeout);
    }, [isVisible, onClose]);

    useEffect(() => {
        const { body, documentElement } = document;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = documentElement.style.overflow;

        body.style.overflow = "hidden";
        documentElement.style.overflow = "hidden";

        return () => {
            body.style.overflow = previousBodyOverflow;
            documentElement.style.overflow = previousHtmlOverflow;
        };
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsVisible(false);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLElement>) => {
        if (event.target !== event.currentTarget || isVisible) return;
        if (event.propertyName !== "transform" && event.propertyName !== "translate") return;
        onClose();
    };

    return createPortal(
        <div className={cn("fixed inset-0 z-1100 ", !isVisible && "pointer-events-none")}>
            <button
                type="button"
                aria-label="Fechar filtros"
                className={cn(
                    "absolute inset-0 cursor-pointer border-0 bg-black/60 p-0 transition-opacity duration-300",
                    isVisible ? "opacity-100" : "opacity-0",
                )}
                onClick={() => setIsVisible(false)}
            />

            <aside
                ref={setSheetRef}
                role="dialog"
                aria-modal="true"
                aria-label="Filtros"
                className={cn(
                    "drawer-scroll absolute flex flex-col bg-background-surface transition-transform duration-300 ease-in-out",
                    "inset-x-0 bottom-0 max-h-[98dvh] overflow-y-auto rounded-t-3xl border-t border-brd-default",
                    "md:inset-y-0 md:left-auto md:right-0 md:h-dvh md:max-h-dvh md:w-[28rem] md:overflow-hidden md:rounded-none md:border-t-0 md:border-l",
                    isVisible
                        ? "translate-y-0 md:translate-x-0"
                        : "translate-y-full md:translate-y-0 md:translate-x-full",
                )}
                style={isMobile ? dragStyle : undefined}
                onTransitionEnd={(event) => {
                    onDragTransitionEnd(event);
                    handleTransitionEnd(event);
                }}
            >
                <header
                    className={cn(
                        "sticky top-0 z-10 shrink-0 bg-background-surface md:static",
                        isMobile && "cursor-grab touch-none active:cursor-grabbing",
                    )}
                    {...(isMobile ? dragHandleProps : {})}
                >
                    <span aria-hidden className="mx-auto mt-3 block h-1.5 w-12 rounded-full bg-brd-strong md:hidden" />
                    <div className="relative flex h-14 items-center justify-center px-6">
                        <h2 className="text-base font-semibold text-content-primary">Filtros</h2>
                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute right-6"
                            aria-label="Fechar"
                            onClick={() => setIsVisible(false)}
                        >
                            <XIcon className="text-content-danger" />
                        </Button>
                    </div>
                </header>

                <div className="space-y-6 px-6 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:drawer-scroll md:min-h-0 md:flex-1 md:overflow-y-auto">
                    <TransactionsCategoryFilter />
                    <TransactionsStatusFilter />
                    <TransactionsTypeFilter />
                    <TransactionsClearFiltersButton />
                </div>
            </aside>
        </div>,
        document.body,
    );
}
