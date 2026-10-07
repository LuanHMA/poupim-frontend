import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import { ArrowDownLeft, ArrowUpRight, ChevronLeft, PlusIcon } from "lucide-react";
import { useTransactionDrawer } from "../../hooks/use-transaction-drawer";
import { NewTransactionForm } from "./new-transaction-form";

export function NewTransactionDrawer() {
    const {
        isMounted,
        isVisible,
        closeDrawer,
        handleTransitionEnd,
        isOpenTransactionOptions,
        transactionType,
        handleOpenDrawer,
        toggleTransactionOptions,
    } = useTransactionDrawer();

    return (
        <>
            {/* Botão para abrir as opções de transação */}
            <div className="fixed bottom-28 right-4 z-998 flex flex-col gap-4 sm:bottom-10">
                <Button className="w-14 h-14 rounded-xl group" onClick={toggleTransactionOptions}>
                    <PlusIcon className={`${isOpenTransactionOptions && 'group-hover:rotate-135'} transition-all duration-800`} />
                </Button>
            </div>


            {/* Overlay para fechar as opções de transação */}
            {isOpenTransactionOptions && (
                <button
                    type="button"
                    aria-label="Fechar opções de transação"
                    className="fixed inset-0 z-997 cursor-pointer border-0 bg-background-base/80 p-0"
                    onClick={toggleTransactionOptions}
                />
            )}

            {/* Opções de transação */}
            <div
                className={cn(
                    "fixed right-4 bottom-48 md:bottom-28 z-998 flex flex-col items-start gap-2 rounded-xl bg-background-elevated p-2 transition-all duration-300",
                    isOpenTransactionOptions
                        ? "translate-0 scale-100 opacity-100"
                        : "pointer-events-none translate-4 scale-95 opacity-0",
                )}
            >
                <Button
                    variant="outline"
                    size="full"
                    leftIcon={<ArrowDownLeft className="text-content-success" />}
                    onClick={() => handleOpenDrawer("INCOME")}
                >
                    Ganho
                </Button>
                <Button
                    variant="outline"
                    size="full"
                    leftIcon={<ArrowUpRight className="text-content-danger" />}
                    onClick={() => handleOpenDrawer("EXPENSE")}
                >
                    Gasto
                </Button>
            </div>

            {/* Painel de nova transação */}
            {isMounted && (
                <>
                    <button
                        type="button"
                        aria-label="Fechar painel"
                        className={cn(
                            "fixed inset-0 z-999 hidden cursor-pointer border-0 bg-black/60 p-0 transition-opacity duration-300 ease-out sm:block",
                            isVisible ? "opacity-100" : "opacity-0",
                        )}
                        onClick={closeDrawer}
                    />

                    <section
                        className={cn(
                            "fixed z-1000 flex flex-col overflow-hidden bg-background-base transition-transform duration-300 ease-out",
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
                            <Button size="icon" className="absolute left-6" onClick={closeDrawer} variant="outline">
                                <ChevronLeft className="text-content-priamary" />
                            </Button>

                            <h1 className="px-12 text-center text-xl font-bold text-content-primary flex items-center gap-2">
                                {transactionType === "INCOME" ? (
                                    <>
                                        <ArrowDownLeft className="text-content-success" />
                                        Novo Ganho
                                    </>
                                ) : (
                                    <>
                                        <ArrowUpRight className="text-content-danger" />
                                        Novo Gasto
                                    </>
                                )}
                            </h1>
                        </header>

                        <NewTransactionForm transactionType={transactionType} onCloseDrawer={closeDrawer} />
                    </section>
                </>
            )}
        </>
    )
}
