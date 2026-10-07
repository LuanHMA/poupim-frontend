import { CategoriesService } from "@/modules/categories/categories.service";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import type { FormFieldControlProps } from "@/shared/types/ui";
import { cn } from "@/shared/utils/cn";
import { fieldControlClassName } from "@/shared/utils/form";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, Tag } from "lucide-react";
import { Label, Select as SelectPrimitive } from "radix-ui";
import { useId, useState, type FocusEventHandler, type Ref } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { CategoryIcon, type CategoryIconSource } from "./category-icon";
import { CategoryPickerDrawer } from "./category-picker-drawer";

export type CategorySelection = CategoryIconSource & {
    id: number
    name: string
}

export type CategoryInputBaseProps = {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    value?: number | null;
    category?: CategorySelection | null;
    onValueChange?: (value: number) => void;
    onBlur?: FocusEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    required?: boolean;
    ref?: Ref<HTMLButtonElement>;
};

export type CategoryInputProps<TFieldValues extends FieldValues = FieldValues> =
    | (CategoryInputBaseProps & FormFieldControlProps<TFieldValues>)
    | CategoryInputBaseProps;

function CategoryOption({ category }: { category: CategorySelection }) {
    return (
        <span className="flex min-w-0 items-center gap-2">
            <span
                className="grid size-8 shrink-0 place-items-center rounded-full"
                style={{ backgroundColor: `${category.color}33` }}
            >
                <CategoryIcon category={category} className="size-4" />
            </span>
            <span className="truncate">{category.name}</span>
        </span>
    );
}

function CategoryInputControl({
    id,
    name,
    label = "Categoria",
    placeholder = "Categoria",
    error,
    value = null,
    category = null,
    onValueChange,
    onBlur,
    disabled,
    required,
    ref,
}: CategoryInputBaseProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: () => CategoriesService.getCategories(),
    });

    const { isMobile } = useIsMobile({});

    const categories = data?.categories ?? [];

    const selectedFromList = categories.find((item) => item.id === value) ?? null;
    const selectedFromProps = category && category.id === value ? category : null;
    const selected = selectedFromList ?? selectedFromProps;

    const placeholderText = isLoading
        ? "Carregando categorias..."
        : isError
            ? "Não foi possível carregar as categorias"
            : categories.length === 0
                ? "Nenhuma categoria disponível"
                : placeholder;

    return (
        <div className="flex w-full flex-col gap-1.5">
            {label ? (
                <Label.Root htmlFor={inputId} className="text-sm font-medium text-content-primary">
                    {label}
                    {required ? <span className="ml-1 text-content-accent">*</span> : null}
                </Label.Root>
            ) : null}

            {isMobile ? (
                <button
                    ref={ref}
                    id={inputId}
                    name={name}
                    type="button"
                    disabled={disabled}
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errorId : undefined}
                    onClick={() => setIsOpen(true)}
                    onBlur={onBlur}
                    className={cn(fieldControlClassName(error), "flex items-center gap-2 text-left")}
                >
                    <span className="inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full">
                        {selected ? (
                            <CategoryIcon category={selected} className="size-full" />
                        ) : (
                            <Tag className="size-full text-content-muted" aria-hidden />
                        )}
                    </span>
                    <span className={cn("truncate", selected ? "text-input-content" : "text-input-placeholder")}>
                        {selected?.name ?? placeholderText}
                    </span>
                </button>
            ) : (
                <SelectPrimitive.Root
                    name={name}
                    value={selectedFromList ? String(selectedFromList.id) : undefined}
                    onValueChange={(next) => onValueChange?.(Number(next))}
                    disabled={disabled || isLoading || isError || categories.length === 0}
                    required={required}
                >
                    <SelectPrimitive.Trigger
                        ref={ref}
                        id={inputId}
                        onBlur={onBlur}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? errorId : undefined}
                        className={cn(
                            fieldControlClassName(error),
                            "flex cursor-pointer items-center justify-between gap-2 text-left",
                            "data-[state=open]:border-input-focus-border data-[state=open]:bg-input-focus-bg data-[state=open]:ring-2 data-[state=open]:ring-input-focus-ring",
                        )}
                    >
                        {selected ? (
                            <CategoryOption category={selected} />
                        ) : (
                            <span className="truncate text-input-placeholder">{placeholderText}</span>
                        )}
                        <SelectPrimitive.Icon>
                            <ChevronDown className="size-4 shrink-0 text-content-muted" />
                        </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>

                    <SelectPrimitive.Portal>
                        <SelectPrimitive.Content
                            position="popper"
                            sideOffset={6}
                            className="z-1200 max-h-72 w-(--radix-select-trigger-width) overflow-hidden rounded-xl border border-brd-default bg-background-elevated text-content-primary shadow-lg"
                        >
                            <SelectPrimitive.Viewport className="p-1">
                                {categories.map((category) => (
                                    <SelectPrimitive.Item
                                        key={category.id}
                                        value={String(category.id)}
                                        textValue={category.name}
                                        className="relative flex cursor-pointer items-center rounded-lg py-2 pr-8 pl-2 text-sm text-content-primary outline-none select-none data-highlighted:bg-background-surface"
                                    >
                                        <SelectPrimitive.ItemText>
                                            <CategoryOption category={category} />
                                        </SelectPrimitive.ItemText>
                                        <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex text-content-accent">
                                            <Check className="size-4" />
                                        </SelectPrimitive.ItemIndicator>
                                    </SelectPrimitive.Item>
                                ))}
                            </SelectPrimitive.Viewport>
                        </SelectPrimitive.Content>
                    </SelectPrimitive.Portal>
                </SelectPrimitive.Root>
            )}

            {error ? (
                <p id={errorId} className="text-xs text-content-danger">
                    {error}
                </p>
            ) : null}

            <CategoryPickerDrawer
                open={isMobile && isOpen && !disabled}
                categories={categories}
                isLoading={isLoading}
                isError={isError}
                selectedId={value}
                onClose={() => setIsOpen(false)}
                onConfirm={(categoryId) => {
                    onValueChange?.(categoryId);
                    setIsOpen(false);
                }}
            />
        </div>
    );
}

export function CategoryInput<TFieldValues extends FieldValues = FieldValues>(
    props: CategoryInputProps<TFieldValues>,
) {
    if ("control" in props && props.control) {
        const { control, name, error, ...rest } = props;

        return (
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState }) => (
                    <CategoryInputControl
                        {...rest}
                        name={field.name}
                        ref={field.ref}
                        value={typeof field.value === "number" ? field.value : null}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        error={error ?? fieldState.error?.message}
                    />
                )}
            />
        );
    }

    return <CategoryInputControl {...props} />;
}
