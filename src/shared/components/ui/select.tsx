import type { SelectBaseProps, SelectProps } from "@/shared/types/ui";
import { cn } from "@/shared/utils/cn";
import { fieldControlClassName } from "@/shared/utils/form";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Label, Select as SelectPrimitive } from "radix-ui";
import { useId } from "react";
import { Controller, type FieldValues } from "react-hook-form";

function SelectControl({
    id,
    name,
    label,
    error,
    hint,
    placeholder = "Selecione",
    options,
    disabled,
    required,
    value,
    defaultValue,
    onValueChange,
    onBlur,
    ref,
    className,
}: SelectBaseProps) {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;

    return (
        <div className="flex w-full flex-col gap-1.5">
            {label ? (
                <Label.Root
                    htmlFor={selectId}
                    className="text-sm font-medium text-content-primary"
                >
                    {label}
                    {required ? (
                        <span className="ml-1 text-content-accent">*</span>
                    ) : null}
                </Label.Root>
            ) : null}

            <SelectPrimitive.Root
                name={name}
                value={value}
                defaultValue={defaultValue}
                onValueChange={onValueChange}
                disabled={disabled}
                required={required}
            >
                <SelectPrimitive.Trigger
                    ref={ref}
                    id={selectId}
                    onBlur={onBlur}
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error ? errorId : hint ? hintId : undefined
                    }
                    className={cn(
                        fieldControlClassName(error),
                        "flex cursor-pointer items-center justify-between gap-2 text-left",
                        "data-placeholder:text-input-placeholder",
                        "data-[state=open]:border-input-focus-border data-[state=open]:bg-input-focus-bg data-[state=open]:ring-2 data-[state=open]:ring-input-focus-ring",
                        className,
                    )}
                >
                    <SelectPrimitive.Value placeholder={placeholder} />
                    <SelectPrimitive.Icon>
                        <ChevronDown className="size-4 shrink-0 text-content-muted" />
                    </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>

                <SelectPrimitive.Portal>
                    <SelectPrimitive.Content
                        position="popper"
                        sideOffset={6}
                        className="z-50 max-h-72 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-brd-default bg-background-elevated text-content-primary shadow-lg"
                    >
                        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 text-content-muted">
                            <ChevronUp className="size-4" />
                        </SelectPrimitive.ScrollUpButton>

                        <SelectPrimitive.Viewport className="p-1">
                            {options.map((option) => (
                                <SelectPrimitive.Item
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    className={cn(
                                        "relative flex cursor-pointer items-center rounded-lg py-2 pr-8 pl-3 text-sm outline-none select-none",
                                        "text-content-primary",
                                        "data-highlighted:bg-background-accent data-highlighted:text-content-inverse",
                                        "data-disabled:cursor-not-allowed data-disabled:text-content-muted",
                                    )}
                                >
                                    <SelectPrimitive.ItemText>
                                        {option.label}
                                    </SelectPrimitive.ItemText>
                                    <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex">
                                        <Check className="size-4" />
                                    </SelectPrimitive.ItemIndicator>
                                </SelectPrimitive.Item>
                            ))}
                        </SelectPrimitive.Viewport>

                        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 text-content-muted">
                            <ChevronDown className="size-4" />
                        </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
            </SelectPrimitive.Root>

            {error ? (
                <p id={errorId} className="text-xs text-content-danger">
                    {error}
                </p>
            ) : hint ? (
                <p id={hintId} className="text-xs text-content-muted">
                    {hint}
                </p>
            ) : null}
        </div>
    );
}

export function Select<TFieldValues extends FieldValues = FieldValues>(
    props: SelectProps<TFieldValues>,
) {
    if ("control" in props && props.control) {
        const { control, name, error, ...rest } = props;

        return (
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState }) => (
                    <SelectControl
                        {...rest}
                        name={field.name}
                        value={field.value || undefined}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        error={error ?? fieldState.error?.message}
                    />
                )}
            />
        );
    }

    return <SelectControl {...props} />;
}
