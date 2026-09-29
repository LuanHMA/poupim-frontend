import type { InputBaseProps, InputProps } from "@/shared/types/ui";
import { cn } from "@/shared/utils/cn";
import { fieldControlClassName } from "@/shared/utils/form";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "radix-ui";
import { useId, useState } from "react";
import { Controller, type FieldValues } from "react-hook-form";

function InputControl({
    id,
    name,
    label,
    error,
    hint,
    icon,
    className,
    type = "text",
    disabled,
    required,
    ref,
    ...props
}: InputBaseProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const isPassword = type === "password";
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputType = isPassword ? (isPasswordVisible ? "text" : "password") : type;

    return (
        <div className="flex w-full flex-col gap-1.5">
            {label ? (
                <Label.Root
                    htmlFor={inputId}
                    className="text-sm font-medium text-content-primary"
                >
                    {label}
                    {required ? (
                        <span className="ml-1 text-content-accent">*</span>
                    ) : null}
                </Label.Root>
            ) : null}

            <div className="relative">
                {icon ? (
                    <span
                        className="pointer-events-none absolute top-1/2 left-3 inline-flex size-4 -translate-y-1/2 items-center justify-center text-content-muted [&_svg]:size-full"
                        aria-hidden
                    >
                        {icon}
                    </span>
                ) : null}

                <input
                    {...props}
                    ref={ref}
                    id={inputId}
                    name={name}
                    type={inputType}
                    disabled={disabled}
                    required={required}
                    className={cn(
                        fieldControlClassName(error),
                        icon && "pl-9",
                        isPassword && "pr-10",
                        className,
                    )}
                />

                {isPassword ? (
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => setIsPasswordVisible((visible) => !visible)}
                        className="absolute top-1/2 right-2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-content-muted transition-colors hover:text-content-accent disabled:text-input-disabled-content"
                        aria-label={
                            isPasswordVisible ? "Ocultar senha" : "Mostrar senha"
                        }
                    >
                        {isPasswordVisible ? (
                            <EyeOff className="size-4" />
                        ) : (
                            <Eye className="size-4" />
                        )}
                    </button>
                ) : null}
            </div>

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

export function Input<TFieldValues extends FieldValues = FieldValues>(
    props: InputProps<TFieldValues>,
) {
    if ("control" in props && props.control) {
        const { control, name, error, ...rest } = props;

        return (
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState }) => (
                    <InputControl
                        {...rest}
                        {...field}
                        value={field.value ?? ""}
                        error={error ?? fieldState.error?.message}
                    />
                )}
            />
        );
    }

    return <InputControl {...props} />;
}
