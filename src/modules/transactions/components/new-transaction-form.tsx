import { CategoryInput } from "@/modules/categories/components/category-input";
import { Button, Input, Switch } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import { CalendarIcon, ChevronDown, PencilIcon } from "lucide-react";
import { useState } from "react";
import { useCreateTransaction } from "../hooks/use-create-transaction";
import type { CreateTransactionSchemaType } from "../schemas/create-transaction-schema";
import { AmountInput } from "./amount-input";

interface NewTransactionFormProps {
    transactionType: CreateTransactionSchemaType["type"] | null;
}

export function NewTransactionForm({ transactionType }: NewTransactionFormProps) {
    const [showDetails, setShowDetails] = useState(false);
    const {
        handleSubmit,
        control,
        isSubmitting,
        handleCreateTransaction
    } = useCreateTransaction()

    if (!transactionType) return null;

    return (
        <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={handleSubmit(handleCreateTransaction)}
        >
            <div className="drawer-scroll mt-6 mr-3 min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-y-contain pt-4 pr-4 pb-6 pl-6">
                <AmountInput control={control} name="amount" autoFocus />

                <Input
                    placeholder="Ex: Almoço no restaurante"
                    label="Descrição"
                    icon={<PencilIcon />}
                    control={control}
                    name="description"
                />

                <CategoryInput control={control} name="categoryId" />

                <Input
                    type="date"
                    label="Data da transação"
                    icon={<CalendarIcon />}
                    control={control}
                    name="date"
                />

                <div className="flex items-center gap-2 justify-between border border-brd-subtle rounded-2xl p-4 bg-background-surface">
                    <div className="flex flex-col items-start text-sm">
                        <h2 className="text-sm font-medium text-content-primary">Foi paga</h2>
                        <p className="text-xs text-content-muted">Define se a transação foi paga ou não.</p>
                    </div>
                    <Switch control={control} name="status" />
                </div>

                <div className="flex items-center justify-end mb-0">
                    <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="px-0"
                        aria-expanded={showDetails}
                        leftIcon={
                            <ChevronDown
                                className={cn("transition-transform", showDetails && "rotate-180")}
                            />
                        }
                        onClick={() => setShowDetails((current) => !current)}
                    >
                        Mais opções
                    </Button>
                </div>

                <div className={`space-y-5 overflow-hidden ${showDetails ? "max-h-80" : "max-h-0"} transition-all duration-300`}>
                    <Input placeholder="Ex: Foi pago no cartão de crédito da minha mãe" label="Observação (opcional)" />

                    <div className="flex items-center gap-2 justify-between border border-brd-subtle rounded-2xl p-4 bg-background-surface">
                        <div className="flex flex-col items-start text-sm">
                            <h2 className="text-sm font-medium text-content-primary">Repetir</h2>
                            <p className="text-xs text-content-muted">Essa transação será registrada automaticamente todo mês.</p>
                        </div>
                        <Switch control={control} name="fixed" />
                    </div>

                    <div className="flex items-center gap-2 justify-between border border-brd-subtle rounded-2xl p-4 bg-background-surface">
                        <div className="flex flex-col items-start text-sm">
                            <h2 className="text-sm font-medium text-content-primary">Ignorar Transação</h2>
                            <p className="text-xs text-content-muted">A transação ficará salva mas não será contabilizada.</p>
                        </div>
                        <Switch control={control} name="ignore" />
                    </div>
                </div>
            </div>

            <div className="flex shrink-0 justify-end border-t border-brd-default bg-background-elevated px-6 py-4">
                <Button type="submit" isLoading={isSubmitting}>Registrar Transação</Button>
            </div>
        </form>
    );
}
