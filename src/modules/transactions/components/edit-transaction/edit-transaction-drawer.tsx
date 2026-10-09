import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import { ArrowDownLeft, ArrowUpRight, XIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { useEditTransactionDrawer } from "../../hooks/use-edit-transaction-drawer";
import type { Transaction } from "../../types/transactions";
import { EditTransactionForm } from "./edit-transaction-form";

interface EditTransactionDrawerProps {
    transaction: Transaction;
    onClose: () => void;
    onSaved?: () => void;
}

export function EditTransactionDrawer({ transaction, onClose, onSaved }: EditTransactionDrawerProps) {
    const { isVisible, closeDrawer, handleTransitionEnd } = useEditTransactionDrawer(onClose);

    console.log(transaction)

    return createPortal(
        <>
            <button
                type="button"
                aria-label="Fechar painel"
                className={cn(
                    "fixed inset-0 z-1000 hidden cursor-pointer border-0 bg-black/60 p-0 transition-opacity duration-300 ease-out sm:block",
                    isVisible ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={closeDrawer}
                onTransitionEnd={handleTransitionEnd}
            />

            <section
                className={cn(
                    "fixed z-1000 flex flex-col overflow-hidden bg-background-base max-w-xl transition-transform duration-300 ease-out",
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
                <header className="relative mt-6 flex h-10 shrink-0 items-center justify-center px-6">
                    <Button size="icon" className="absolute right-6" onClick={closeDrawer} variant="outline">
                        <XIcon className="text-content-danger" />
                    </Button>

                    <h1 className="px-12 text-center text-xl font-bold text-content-primary flex items-center gap-2">
                        {transaction.type === "INCOME" ? (
                            <>
                                <ArrowDownLeft className="text-content-success" />
                                Editar Ganho
                            </>
                        ) : (
                            <>
                                <ArrowUpRight className="text-content-danger" />
                                Editar Gasto
                            </>
                        )}
                    </h1>
                </header>

                <EditTransactionForm
                    transaction={transaction}
                    onCloseDrawer={closeDrawer}
                    onSaved={onSaved}
                />
            </section>
        </>,
        document.body,
    );
}
