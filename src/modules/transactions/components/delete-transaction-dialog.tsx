import { Button } from "@/shared/components/ui";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDeleteTransaction } from "../hooks/use-delete-transaction";
import type { Transaction } from "../types/transactions";

interface DeleteTransactionDialogProps {
    transaction: Transaction;
    onClose: () => void;
    onDeleted?: () => void;
}

export function DeleteTransactionDialog({ transaction, onClose, onDeleted }: DeleteTransactionDialogProps) {
    const [isVisible, setIsVisible] = useState(false);

    const closeDialog = () => {
        setIsVisible(false);
    };

    const { isDeleting, handleDeleteTransaction } = useDeleteTransaction({
        transaction,
        onDeleted: () => {
            onDeleted?.();
            closeDialog();
        },
    });

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setIsVisible(true);
        });

        return () => cancelAnimationFrame(frame);
    }, []);

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
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeDialog();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLElement>) => {
        if (event.target !== event.currentTarget || event.propertyName !== "opacity" || isVisible) return;

        onClose();
    };

    return createPortal(
        <div
            className={`fixed inset-0 z-1200 flex items-center justify-center p-4 transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
            onTransitionEnd={handleTransitionEnd}
        >
            <button
                type="button"
                aria-label="Cancelar exclusão"
                className="absolute inset-0 cursor-pointer border-0 bg-background-base/80 p-0"
                onClick={closeDialog}
            />

            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-transaction-title"
                aria-describedby="delete-transaction-description"
                className="relative w-full max-w-md rounded-2xl border border-brd-default bg-background-surface p-6"
            >
                <h2 id="delete-transaction-title" className="text-lg font-semibold text-content-primary">
                    Deletar transação
                </h2>
                <p id="delete-transaction-description" className="mt-2 text-sm text-content-muted">
                    Tem certeza que deseja deletar &quot;{transaction.description}&quot;? Essa ação não pode ser desfeita.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={closeDialog} disabled={isDeleting}>
                        Cancelar
                    </Button>
                    <Button type="button" variant="danger" isLoading={isDeleting} onClick={handleDeleteTransaction}>
                        Deletar
                    </Button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
