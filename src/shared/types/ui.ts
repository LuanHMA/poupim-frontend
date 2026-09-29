import type { ComponentProps, FocusEventHandler, ReactNode, Ref } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "link"
    | "success"
    | "highlight";

export type ButtonSize = "sm" | "md" | "lg" | "full" | "icon";

export type BadgeVariant =
    | "default"
    | "accent"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "outline"
    | "muted";

export type BadgeSize = "sm" | "md" | "lg";

export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type FormFieldControlProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    control: Control<TFieldValues>;
    name: TName;
};

export type InputBaseProps = Omit<
    ComponentProps<"input">,
    "size" | "name"
> & {
    name?: string;
    label?: string;
    error?: string;
    hint?: string;
    icon?: ReactNode;
};

export type InputProps<TFieldValues extends FieldValues = FieldValues> =
    | (InputBaseProps & FormFieldControlProps<TFieldValues>)
    | InputBaseProps;

export type SelectBaseProps = {
    id?: string;
    name?: string;
    label?: string;
    error?: string;
    hint?: string;
    placeholder?: string;
    options: SelectOption[];
    disabled?: boolean;
    required?: boolean;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onBlur?: FocusEventHandler<HTMLButtonElement>;
    ref?: Ref<HTMLButtonElement>;
    className?: string;
};

export type SelectProps<TFieldValues extends FieldValues = FieldValues> =
    | (SelectBaseProps & FormFieldControlProps<TFieldValues>)
    | SelectBaseProps;

export type SwitchBaseProps = Omit<
    ComponentProps<"button">,
    "onChange" | "value" | "name"
> & {
    name?: string;
    label?: string;
    error?: string;
    hint?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    required?: boolean;
    value?: string;
};

export type SwitchProps<TFieldValues extends FieldValues = FieldValues> =
    | (SwitchBaseProps & FormFieldControlProps<TFieldValues>)
    | SwitchBaseProps;
