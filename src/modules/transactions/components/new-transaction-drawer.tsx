import { Button } from "@/shared/components/ui";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { cn } from "@/shared/utils/cn";
import { PlusIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NewTransactionForm } from "./new-transaction-form";

export function NewTransactionDrawer() {
    const { isMobile } = useIsMobile({});
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const openDrawer = () => {
        setIsMounted(true);
    }

    const closeDrawer = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        if (!isMounted) return;

        const frame = requestAnimationFrame(() => {
            setIsVisible(true);
        });

        return () => cancelAnimationFrame(frame);
    }, [isMounted]);

    useEffect(() => {
        if (!isMounted || !isMobile) return;

        const { body, documentElement } = document;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = documentElement.style.overflow;

        body.style.overflow = "hidden";
        documentElement.style.overflow = "hidden";

        return () => {
            body.style.overflow = previousBodyOverflow;
            documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [isMounted, isMobile]);

    const handleTransitionEnd = () => {
        if (!isVisible) {
            setIsMounted(false);
        }
    }

    return (
        <>
            {/* Botão de abrir o drawer */}
            <div className="fixed bottom-28 right-4 z-998 sm:bottom-10">
                <Button className="w-14 h-14 rounded-xl" onClick={openDrawer}>
                    <PlusIcon />
                </Button>
            </div>

            {isMounted && (
                <>
                    <button
                        type="button"
                        aria-label="Fechar painel"
                        className={cn(
                            "fixed inset-0 z-998 hidden cursor-pointer border-0 bg-black/60 p-0 transition-opacity duration-300 ease-out sm:block",
                            isVisible ? "opacity-100" : "opacity-0",
                        )}
                        onClick={closeDrawer}
                    />
                    <section
                        className={cn(
                            "fixed z-999 flex flex-col overflow-hidden bg-background-base p-6 transition-transform duration-300 ease-out",
                            "inset-0 h-dvh max-h-dvh w-full",
                            "sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:max-h-full sm:w-1/2",
                            "sm:border-l sm:border-brd-default sm:bg-background-surface",
                            "lg:w-1/3",
                            isVisible
                                ? "translate-y-0 sm:translate-x-0"
                                : "translate-y-full sm:translate-y-0 sm:translate-x-full",
                        )}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        <header className="relative shrink-0">
                            <Button size="icon" className="absolute top-0 right-0" onClick={closeDrawer} variant="outline">
                                <XIcon className="text-content-danger" />
                            </Button>

                            <h1 className="px-12 text-center text-xl font-bold text-content-primary">
                                Nova Despesa
                            </h1>
                        </header>

                        <div className="drawer-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
                            <NewTransactionForm transactionType="income" />
                        </div>
                    </section>
                </>
            )}

        </>
    )
}
