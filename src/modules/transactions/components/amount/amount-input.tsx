import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import type { FormFieldControlProps } from "@/shared/types/ui";
import { cn } from "@/shared/utils/cn";
import { useEffect, useId, useRef, useState, type ClipboardEvent, type FocusEventHandler, type KeyboardEvent, type Ref } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { amountToDigits, appendAmountDigits, digitsToAmount, formatAmountDigits, removeAmountDigit } from "../../utils/currency-amount";
import { AmountKeyboard } from "./amount-keyboard";

const AMOUNT_FONT_MAX = 48;
const AMOUNT_FONT_MIN = 16;
const PREFIX_FONT_MAX = 30;

function fittedAmountFontSize(naturalWidth: number, availableWidth: number, gap: number) {
    const naturalText = naturalWidth - gap;
    const availableText = availableWidth - gap;
    if (naturalText <= 0 || availableText <= 0 || naturalText <= availableText) return AMOUNT_FONT_MAX;
    return Math.max(AMOUNT_FONT_MIN, (AMOUNT_FONT_MAX * availableText) / naturalText);
}

function measureTextWidth(text: string, fontSize: number, fontWeight: number, fontFamily: string) {
    const context = document.createElement("canvas").getContext("2d");
    if (!context) return 0;
    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    return context.measureText(text).width;
}

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
    const rowRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const { isMobile } = useIsMobile({ limitScreenWidth: 639 });
    const [isFocused, setIsFocused] = useState(false);
    const [amountFontSize, setAmountFontSize] = useState(AMOUNT_FONT_MAX);
    const digits = amountToDigits(value);
    const formattedAmount = formatAmountDigits(digits);
    const prefixFontSize = PREFIX_FONT_MAX * (amountFontSize / AMOUNT_FONT_MAX);

    useEffect(() => {
        const row = rowRef.current;
        const measure = measureRef.current;
        if (!row || !measure) return;

        const fit = () => {
            const gap = Number.parseFloat(getComputedStyle(row).columnGap) || 0;
            const fontFamily = getComputedStyle(row).fontFamily;
            const available = Math.max(0, row.clientWidth - 2);
            const canvasWidth =
                measureTextWidth("R$", PREFIX_FONT_MAX, 600, fontFamily) +
                gap +
                measureTextWidth(formattedAmount, AMOUNT_FONT_MAX, 700, fontFamily);
            const natural = Math.max(measure.getBoundingClientRect().width, canvasWidth);
            const next = fittedAmountFontSize(natural, available, gap);
            setAmountFontSize((current) => (Math.abs(current - next) < 0.5 ? current : next));
        };

        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(row);
        return () => observer.disconnect();
    }, [formattedAmount]);

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
                    "w-full min-w-0 rounded-2xl border border-brd-subtle bg-background-surface p-6 transition-colors duration-300 focus-within:border-input-focus-ring",
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
                    <div ref={rowRef} className="flex w-full min-w-0 items-center justify-center gap-3 overflow-hidden">
                        <span
                            className="shrink-0 font-semibold leading-none text-content-accent transition-[font-size] duration-300 ease-out"
                            style={{ fontSize: prefixFontSize }}
                        >
                            R$
                        </span>
                        <span
                            className="whitespace-nowrap font-bold leading-none tabular-nums text-content-primary transition-[font-size] duration-300 ease-out"
                            style={{ fontSize: amountFontSize }}
                        >
                            {formattedAmount}
                        </span>
                    </div>
                    <span
                        ref={measureRef}
                        aria-hidden
                        className="pointer-events-none fixed top-0 left-[-9999px] flex w-max items-center gap-3 whitespace-nowrap"
                    >
                        <span className="font-semibold" style={{ fontSize: PREFIX_FONT_MAX }}>
                            R$
                        </span>
                        <span className="font-bold tabular-nums" style={{ fontSize: AMOUNT_FONT_MAX }}>
                            {formattedAmount}
                        </span>
                    </span>
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
