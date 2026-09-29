import type { SwitchBaseProps, SwitchProps } from "@/shared/types/ui";
import { cn } from "@/shared/utils/cn";
import { Label, Switch as SwitchPrimitive } from "radix-ui";
import { useId } from "react";
import { Controller, type FieldValues } from "react-hook-form";

function SwitchControl({
    id,
    name,
    label,
    error,
    hint,
    className,
    disabled,
    required,
    checked,
    defaultChecked,
    onCheckedChange,
    value,
    ref,
    ...props
}: SwitchBaseProps) {
    const generatedId = useId();
    const switchId = id ?? generatedId;
    const errorId = `${switchId}-error`;
    const hintId = `${switchId}-hint`;

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
                <SwitchPrimitive.Root
                    {...props}
                    ref={ref}
                    id={switchId}
                    name={name}
                    value={value}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onCheckedChange={onCheckedChange}
                    disabled={disabled}
                    required={required}
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error ? errorId : hint ? hintId : undefined
                    }
                    className={cn(
                        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-brd-default transition-colors",
                        "bg-background-elevated",
                        "data-[state=checked]:border-brd-accent data-[state=checked]:bg-background-accent",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-ring",
                        "disabled:cursor-not-allowed disabled:bg-input-disabled-bg disabled:border-input-disabled-border",
                        error && "border-input-error-border",
                        className,
                    )}
                >
                    <SwitchPrimitive.Thumb
                        className={cn(
                            "pointer-events-none block size-5 rounded-full bg-content-primary shadow-sm ring-0 transition-transform",
                            "data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-content-inverse",
                            "data-[state=unchecked]:translate-x-0.5",
                        )}
                    />
                </SwitchPrimitive.Root>

                {label ? (
                    <Label.Root
                        htmlFor={switchId}
                        className="text-sm font-medium text-content-primary peer-disabled:text-content-muted"
                    >
                        {label}
                        {required ? (
                            <span className="ml-1 text-content-accent">*</span>
                        ) : null}
                    </Label.Root>
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

export function Switch<TFieldValues extends FieldValues = FieldValues>(
    props: SwitchProps<TFieldValues>,
) {
    if ("control" in props && props.control) {
        const { control, name, error, defaultChecked: _defaultChecked, ...rest } = props;

        return (
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState }) => (
                    <SwitchControl
                        {...rest}
                        name={field.name}
                        checked={Boolean(field.value)}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        error={error ?? fieldState.error?.message}
                    />
                )}
            />
        );
    }

    return <SwitchControl {...props} />;
}
