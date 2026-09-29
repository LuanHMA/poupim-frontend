import { CategoryInput } from "@/modules/categories/components/category-input";
import { Button, Input, Switch } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import { CalendarIcon, ChevronDown, PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AmountInput } from "./amount-input";

type NewTransactionFormValues = {
    amount: number;
    categoryId: number | null;
};

export function NewTransactionForm({ transactionType }: { transactionType: "income" | "expense" }) {
    const [showDetails, setShowDetails] = useState(false);
    const { control, handleSubmit } = useForm<NewTransactionFormValues>({
        defaultValues: { amount: 0, categoryId: null },
    });

    return (
        <form
            className="pt-8 space-y-5"
            onSubmit={handleSubmit(() => undefined)}
        >
            <AmountInput control={control} name="amount" autoFocus />

            <Input
                placeholder="Ex: Almoço no restaurante"
                label="Descrição"
                icon={<PencilIcon />}
            />

            <CategoryInput control={control} name="categoryId" />

            <Input
                type="date"
                label="Data da transação"
                icon={<CalendarIcon />}
            />

            <div className="flex items-center gap-2 justify-between border border-brd-subtle rounded-2xl p-4 bg-background-surface">
                <div className="flex flex-col items-start text-sm">
                    <h2 className="text-sm font-medium text-content-primary">Foi paga</h2>
                    <p className="text-xs text-content-muted">Define se a transação foi paga ou não.</p>
                </div>
                <Switch />
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
                    <Switch />
                </div>

                <div className="flex items-center gap-2 justify-between border border-brd-subtle rounded-2xl p-4 bg-background-surface">
                    <div className="flex flex-col items-start text-sm">
                        <h2 className="text-sm font-medium text-content-primary">Ignorar Transação</h2>
                        <p className="text-xs text-content-muted">A transação ficará salva mas não será contabilizada.</p>
                    </div>
                    <Switch />
                </div>
            </div>

            <Button type="submit" className="absolute bottom-6 left-6 right-6">Registrar Transação</Button>
        </form>
    );
}
