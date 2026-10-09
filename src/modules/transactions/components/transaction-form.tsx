import { CategoryInput, type CategorySelection } from "@/modules/categories/components/category-input";
import { Button, Input, Switch } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import { CalendarIcon, ChevronDown, PencilIcon } from "lucide-react";
import { useState, type FormEventHandler } from "react";
import type { Control } from "react-hook-form";
import type { CreateTransactionSchemaType } from "../schemas/create-transaction-schema";
import type { TransactionType } from "../types/transactions";
import { AmountInput } from "./amount/amount-input";
interface TransactionFormProps {
    transactionType: TransactionType;
    control: Control<CreateTransactionSchemaType>;
    isSubmitting: boolean;
    onSubmit: FormEventHandler<HTMLFormElement>;
    submitLabel: string;
    autoFocusAmount?: boolean;
    category?: CategorySelection | null;
}

export function TransactionForm({
    transactionType,
    control,
    isSubmitting,
    onSubmit,
    submitLabel,
    autoFocusAmount = false,
    category = null,
}: TransactionFormProps) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <form
            className="flex min-h-0 w-full min-w-0 flex-1 flex-col"
            onSubmit={onSubmit}
        >
            <div className="drawer-scroll mt-4 mr-3 min-h-0 w-full min-w-0 flex-1 space-y-5 overflow-x-hidden overflow-y-auto overscroll-y-contain pt-4 pr-4 pb-6 pl-6">
                <AmountInput control={control} name="amount" autoFocus={autoFocusAmount} />

                <Input
                    placeholder="Ex: Almoço no restaurante"
                    label="Descrição"
                    icon={<PencilIcon />}
                    control={control}
                    name="description"
                />

                <CategoryInput control={control} name="categoryId" category={category} />

                <Input
                    type="date"
                    label="Data da transação"
                    icon={<CalendarIcon />}
                    control={control}
                    name="date"
                />

                <div className="flex items-center gap-2 justify-between border border-brd-subtle rounded-2xl p-4 bg-background-surface">
                    <div className="flex flex-col items-start text-sm">
                        <h2 className="text-sm font-medium text-content-primary">{transactionType === "INCOME" ? "Recebida" : "Paga"}</h2>
                        <p className="text-xs text-content-muted">{transactionType === "INCOME" ? "Define se a transação foi recebida ou não." : "Define se a transação foi paga ou não."}</p>
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
                    <Input
                        placeholder="Ex: Foi pago no cartão de crédito da minha mãe"
                        label="Observação (opcional)"
                        control={control}
                        name="observation"
                    />

                    {/* <div className="flex items-center gap-2 justify-between border border-brd-subtle rounded-2xl p-4 bg-background-surface">
                        <div className="flex flex-col items-start text-sm">
                            <h2 className="text-sm font-medium text-content-primary">Repetir</h2>
                            <p className="text-xs text-content-muted">Essa transação será registrada automaticamente todo mês.</p>
                        </div>
                        <Switch control={control} name="fixed" />
                    </div> */}

                    <div className="flex items-center gap-2 justify-between border border-brd-subtle rounded-2xl p-4 bg-background-surface">
                        <div className="flex flex-col items-start text-sm">
                            <h2 className="text-sm font-medium text-content-primary">Ignorar Transação</h2>
                            <p className="text-xs text-content-muted">A transação ficará salva mas não será contabilizada.</p>
                        </div>
                        <Switch control={control} name="ignore" />
                    </div>
                </div>
            </div>

            <div className="flex shrink-0 justify-end border-t border-brd-default bg-background-surface px-6 py-4">
                <Button type="submit" isLoading={isSubmitting}>{submitLabel}</Button>
            </div>
        </form>
    );
}
