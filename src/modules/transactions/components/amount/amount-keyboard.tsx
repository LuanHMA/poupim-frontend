import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import { CheckIcon, Delete } from "lucide-react";
import type { ComponentProps, PointerEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

type AmountKeyboardProps = {
    open: boolean;
    onDigit: (digit: string) => void;
    onBackspace: () => void;
    onConfirm: () => void;
};

function keepInputFocus(event: PointerEvent<HTMLElement>) {
    event.preventDefault();
}

function Key({ className, children, ...props }: ComponentProps<"button"> & { children: ReactNode }) {
    return (
        <button
            type="button"
            onPointerDown={keepInputFocus}
            className={cn(
                "grid size-18 cursor-pointer place-items-center rounded-full border border-brd-strong bg-background-elevated text-2xl font-medium text-content-primary",
                "transition-colors active:bg-brd-strong",
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export function AmountKeyboard({ open, onDigit, onBackspace, onConfirm }: AmountKeyboardProps) {
    if (!open) return null;

    return createPortal(
        <div
            data-amount-keyboard
            onPointerDown={keepInputFocus}
            className="fixed inset-x-0 bottom-0 z-1100 rounded-t-4xl border-t border-brd-default bg-background-elevated px-6 pt-10 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-16px_40px_rgba(0,0,0,0.45)]"
        >
            <div className="grid grid-cols-3 place-items-center w-full max-w-[60%] mx-auto gap-8">
                {DIGITS.map((digit) => (
                    <Key key={digit} onClick={() => onDigit(digit)}>
                        {digit}
                    </Key>
                ))}
                <Key aria-label="Dois zeros" className="text-xl" onClick={() => onDigit("00")}>
                    00
                </Key>
                <Key onClick={() => onDigit("0")}>0</Key>
                <Key aria-label="Apagar" onClick={onBackspace}>
                    <Delete className="size-5" />
                </Key>
            </div>

            <div className="mt-6 flex justify-center">
                <Button
                    data-amount-confirm
                    aria-label="Confirmar valor"

                    onPointerDown={keepInputFocus}
                    onClick={onConfirm}
                    className="grid size-19 place-items-center rounded-full bg-background-accent text-content-inverse transition-colors hover:bg-background-accent-secondary"
                >
                    <CheckIcon className="size-7" />
                </Button>
            </div>
        </div>,
        document.body,
    );
}
