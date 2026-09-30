import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import type { FormFieldControlProps } from "@/shared/types/ui";
import { cn } from "@/shared/utils/cn";
import { useEffect, useId, useRef, useState, type ClipboardEvent, type FocusEventHandler, type KeyboardEvent, type Ref } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { amountToDigits, appendAmountDigits, digitsToAmount, formatAmountDigits, removeAmountDigit } from "../../utils/currency-amount";
import { AmountKeyboard } from "./amount-keyboard";

type AmountInputProps<TFieldValues extends FieldValues = FieldValues> = {
    id?: string;
    name?: string;
    label?: string;
    error?: string;
    hint?: string;
    value?: number;
    onValueChange?: (value: number) => void;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    ref?: Ref<HTMLInputElement>;
} & Partial<FormFieldControlProps<TFieldValues>>;

export function AmountInput<TFieldValues extends FieldValues = FieldValues>({
    id,
    name,
    label = "Valor",
    error,
    hint,
    value = 0,
    onValueChange,
    onBlur,
    disabled,
    required,
    autoFocus,
    ref,
    control,
}: AmountInputProps<TFieldValues>) {
    if (control && name) {
        return (
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState }) => (
                    <AmountField
                        id={id}
                        name={field.name}
                        label={label}
                        error={error ?? fieldState.error?.message}
                        hint={hint}
                        value={typeof field.value === "number" ? field.value : 0}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={disabled}
                        required={required}
                        autoFocus={autoFocus}
                        ref={field.ref}
                    />
                )}
            />
        );
    }

    return (
        <AmountField
            id={id}
            name={name}
            label={label}
            error={error}
            hint={hint}
            value={value}
            onValueChange={onValueChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            ref={ref}
        />
    );
}

function AmountField({
    id,
    name,
    label = "Valor",
    error,
    hint,
    value = 0,
    onValueChange,
    onBlur,
    disabled,
    required,
    autoFocus,
    ref,
}: Omit<AmountInputProps, "control">) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const inputRef = useRef<HTMLInputElement>(null);
    const { isMobile } = useIsMobile({ limitScreenWidth: 639 });
    const [isFocused, setIsFocused] = useState(false);
    const digits = amountToDigits(value);
    const formattedAmount = formatAmountDigits(digits);

    const setAmount = (nextDigits: string) => {
        onValueChange?.(digitsToAmount(nextDigits));
    };

    useEffect(() => {
        if (!isFocused) return;

        const closeOnOutsidePress = (event: PointerEvent) => {
            const target = event.target;
            if (!(target instanceof Element)) return;
            if (target.closest("[data-amount-input], [data-amount-keyboard]")) return;
            inputRef.current?.blur();
        };

        document.addEventListener("pointerdown", closeOnOutsidePress);
        return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
    }, [isFocused]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key >= "0" && event.key <= "9") {
            event.preventDefault();
            setAmount(appendAmountDigits(digits, event.key));
            return;
        }

        if (event.key === "Backspace") {
            event.preventDefault();
            setAmount(removeAmountDigit(digits));
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        setAmount(appendAmountDigits(digits, event.clipboardData.getData("text")));
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        const next = event.relatedTarget;
        const pressedKey = next instanceof Element && next.closest("[data-amount-keyboard]");
        const pressedConfirm = next instanceof Element && next.closest("[data-amount-confirm]");
        if (pressedKey && !pressedConfirm) return;

        setIsFocused(false);
        onBlur?.(event);
    };

    return (
        <div data-amount-input className="flex w-full flex-col gap-1.5">
            <fieldset
                disabled={disabled}
                className={cn(
                    "rounded-2xl border border-brd-subtle bg-background-surface p-6 transition-colors duration-300 focus-within:border-input-focus-ring",
                    error && "ring-2 ring-brd-danger",
                )}
            >
                <label
                    htmlFor={inputId}
                    className="block text-center text-xs font-semibold uppercase tracking-[0.2em] text-content-muted"
                >
                    {label}
                    {required ? <span className="ml-1 text-content-accent">*</span> : null}
                </label>

                <div className="relative mt-6">
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-3xl font-semibold text-content-accent">R$</span>
                        <span className="truncate text-[clamp(1.75rem,10vw,3rem)] font-bold tabular-nums text-content-primary">
                            {formattedAmount}
                        </span>
                    </div>
                    <input
                        ref={(node) => {
                            inputRef.current = node;
                            if (typeof ref === "function") ref(node);
                            else if (ref) ref.current = node;
                        }}
                        id={inputId}
                        name={name}
                        inputMode={isMobile ? "none" : "numeric"}
                        readOnly={isMobile}
                        disabled={disabled}
                        required={required}
                        autoFocus={autoFocus}
                        autoComplete="off"
                        value={formattedAmount}
                        onChange={() => undefined}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        onFocus={() => setIsFocused(true)}
                        onBlur={handleBlur}
                        aria-label={label}
                        className="absolute inset-0 cursor-text opacity-0 focus:outline-none disabled:cursor-not-allowed"
                    />
                </div>
            </fieldset>

            {error ? <p className="text-center text-xs text-content-danger">{error}</p> : null}
            {!error && hint ? <p className="text-center text-xs text-content-muted">{hint}</p> : null}

            <AmountKeyboard
                open={isMobile && isFocused && !disabled}
                onDigit={(digit) => setAmount(appendAmountDigits(digits, digit))}
                onBackspace={() => setAmount(removeAmountDigit(digits))}
                onConfirm={() => inputRef.current?.blur()}
            />
        </div>
    );
}
