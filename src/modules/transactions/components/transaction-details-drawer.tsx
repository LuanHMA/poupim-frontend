import { Badge } from "@/shared/components/ui"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/utils/cn"
import { formatations } from "@/shared/utils/formatations"
import { ArrowDownLeft, ArrowUpRight, Calendar, CircleDashed, EyeOff, Pencil, Repeat, StickyNote, TextAlignStart, Trash, Wallet, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import type { Transaction } from "../types/transactions"
import { DeleteTransactionDialog } from "./delete-transaction-dialog"
import { EditTransactionDrawer } from "./edit-transaction/edit-transaction-drawer"

interface TransactionDetailsDrawerProps {
    transaction: Transaction
    onClose: () => void
}

export function TransactionDetailsDrawer({ transaction, onClose }: TransactionDetailsDrawerProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const closeDrawer = () => {
        setIsVisible(false)
    }

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setIsVisible(true)
        })

        return () => cancelAnimationFrame(frame)
    }, [])

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLElement>) => {
        if (event.target !== event.currentTarget || isVisible) return

        onClose()
    }

    return (
        <>
            <button
                type="button"
                aria-label="Fechar detalhes da transação"
                className="fixed inset-0 z-997 cursor-pointer border-0 bg-background-base/80 p-0"
                onClick={closeDrawer}
            />

            <main
                className={cn(
                    "fixed z-1000 flex flex-col overflow-hidden bg-background-base transition-transform duration-300 ease-in-out",
                    "inset-0 h-dvh max-h-dvh w-full",
                    "sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:max-h-full sm:w-2/3",
                    "sm:border-l sm:border-brd-default sm:bg-background-surface",
                    isVisible
                        ? "scale-100 translate-y-0 sm:translate-x-0"
                        : "translate-y-full scale-0 sm:translate-y-0 sm:translate-x-full",
                )}
                onTransitionEnd={handleTransitionEnd}
            >
                <header className="relative mt-6 flex h-10 shrink-0 items-center justify-center px-6">
                    <Button size="icon" className="absolute right-6" onClick={closeDrawer} variant="outline">
                        <XIcon className="text-content-danger" />
                    </Button>

                    <h1 className="px-12 text-center text-xl font-bold text-content-primary flex items-center gap-2">
                        Detalhes da transação
                    </h1>
                </header>

                <div className="drawer-scroll flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-y-contain p-6">
                    <section className="p-4 rounded-xl bg-background-surface flex flex-col items-start gap-1">
                        <h2 className="text-sm font-medium text-content-muted">Valor</h2>
                        <p className="text-2xl text-content-primary font-semibold tracking-wide">{formatations.currency(transaction.amount)}</p>
                    </section>

                    <section className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                            <TextAlignStart className="text-content-muted size-5" />
                            <h2 className="text-sm font-medium text-content-muted">Descrição</h2>
                        </div>

                        <p className="text-sm text-content-primary">{transaction.description}</p>
                    </section>

                    <section className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                            <Wallet className="text-content-muted size-5" />
                            <h2 className="text-sm font-medium text-content-muted">Tipo de transação</h2>
                        </div>

                        <Badge
                            variant={"outline"}
                            size="md"
                            leftIcon={transaction.type === "INCOME" ?
                                <ArrowDownLeft className="size-4 text-content-success" /> :
                                <ArrowUpRight className="size-4 text-content-danger" />
                            }>
                            {transaction.type === "INCOME" ? "Receita" : "Despesa"}
                        </Badge>
                    </section>

                    <section className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                            <Calendar className="text-content-muted size-5" />
                            <h2 className="text-sm font-medium text-content-muted">Data da transação</h2>
                        </div>

                        <p className="text-sm text-content-primary">{formatations.dateTime(transaction.created_at)}</p>
                    </section>

                    <section className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                            <CircleDashed className="text-content-muted size-5" />
                            <h2 className="text-sm font-medium text-content-muted">Situação</h2>
                        </div>

                        <Badge variant={transaction.status === "PAID" || transaction.status === "RECEIVED" ? "success" : "danger"} size="md">
                            {transaction.status === "PAID" ? "Pago" : transaction.status === "RECEIVED" ? "Recebido" : "Pendente"}
                        </Badge>
                    </section>


                    <section className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                            <StickyNote className="text-content-muted size-5" />
                            <h2 className="text-sm font-medium text-content-muted">Observação</h2>
                        </div>

                        <p className={`text-sm ${transaction.observation ? "text-content-primary" : "text-content-muted italic"}`}>
                            {transaction.observation || "Nenhuma observação"}
                        </p>
                    </section>

                    <section className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                            <EyeOff className="text-content-muted size-5" />
                            <h2 className="text-sm font-medium text-content-muted">Ignorar</h2>
                        </div>

                        <Badge variant={transaction.ignore ? "success" : "danger"} size="md">
                            {transaction.ignore ? "Sim" : "Não"}
                        </Badge>
                    </section>

                    <section className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                            <Repeat className="text-content-muted size-5" />
                            <h2 className="text-sm font-medium text-content-muted">Fixa</h2>
                        </div>

                        <Badge variant={transaction.fixed ? "success" : "danger"} size="md">
                            {transaction.fixed ? "Sim" : "Não"}
                        </Badge>
                    </section>
                </div>

                <footer className="flex shrink-0 gap-4 justify-end border-t border-brd-default bg-background-surface px-6 py-4">
                    <Button type="button" variant="outline" leftIcon={<Pencil className="size-4" />} onClick={() => setIsEditing(true)}>Editar</Button>
                    <Button type="button" variant="danger" leftIcon={<Trash className="size-4" />} onClick={() => setIsDeleting(true)}>Deletar</Button>
                </footer>
            </main>

            {isEditing && (
                <EditTransactionDrawer
                    transaction={transaction}
                    onClose={() => setIsEditing(false)}
                    onSaved={closeDrawer}
                />
            )}

            {isDeleting && (
                <DeleteTransactionDialog
                    transaction={transaction}
                    onClose={() => setIsDeleting(false)}
                    onDeleted={closeDrawer}
                />
            )}
        </>
    )
}
