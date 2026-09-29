import { CategoryIcon } from "@/modules/categories/components/category-icon";
import type { Category } from "@/modules/categories/types/categories";
import { cn } from "@/shared/utils/cn";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type CategoryPickerDrawerProps = {
    open: boolean;
    categories: Category[];
    isLoading: boolean;
    isError: boolean;
    selectedId: number | null;
    onConfirm: (categoryId: number) => void;
    onClose: () => void;
};

export function CategoryPickerDrawer({
    open,
    categories,
    isLoading,
    isError,
    selectedId,
    onConfirm,
    onClose,
}: CategoryPickerDrawerProps) {
    const [pendingId, setPendingId] = useState(selectedId);

    useEffect(() => {
        if (open) setPendingId(selectedId);
    }, [open, selectedId]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-1100">
            <button
                type="button"
                aria-label="Fechar categorias"
                className="absolute inset-0 cursor-pointer border-0 bg-black/60 p-0"
                onClick={onClose}
            />

            <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-brd-default bg-background-elevated px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <h2 className="text-center text-sm font-semibold text-content-primary">Selecione uma categoria</h2>

                

                <div className="drawer-scroll mt-5 max-h-[50dvh] overflow-y-auto">
                    {isLoading ? (
                        <p className="py-8 text-center text-sm text-content-muted">Carregando categorias...</p>
                    ) : isError ? (
                        <p className="py-8 text-center text-sm text-content-danger">Erro ao carregar as categorias</p>
                    ) : categories.length === 0 ? (
                        <p className="py-8 text-center text-sm text-content-muted">Nenhuma categoria disponível.</p>
                    ) : (
                        <div className="grid grid-cols-4 gap-3">
                            {categories.map((category) => {
                                const isPending = pendingId === category.id;

                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        aria-pressed={isPending}
                                        onClick={() => setPendingId(category.id)}
                                        className={cn(
                                            "flex flex-col items-center gap-2 rounded-xl px-1 py-3 border transition-all border-transparent",
                                            isPending && "bg-background-surface/50 border border-brd-accent",
                                        )}
                                    >
                                        <span
                                            className="grid size-10 place-items-center rounded-xl"
                                            style={{ backgroundColor: `${category.color}33` }}
                                        >
                                            <CategoryIcon name={category.icon} color={category.color} className="size-6" />
                                        </span>
                                        <span className="w-full truncate text-center text-[11px] text-content-primary">
                                            {category.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        aria-label="Confirmar categoria"
                        disabled={pendingId == null}
                        onClick={() => pendingId != null && onConfirm(pendingId)}
                        className="grid size-16 place-items-center rounded-full bg-background-accent text-content-inverse disabled:bg-btn-primary-disabled-bg disabled:text-btn-primary-disabled-content"
                    >
                        <CheckIcon className="size-7" />
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
