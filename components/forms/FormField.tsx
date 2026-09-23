import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
    rows?: number;
  };

type SelectProps = BaseProps & {
  as: "select";
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  className?: string;
};

type Props = InputProps | TextareaProps | SelectProps;

const fieldClass =
  "w-full px-4 py-3 rounded-xl border bg-white text-off-black placeholder:text-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors text-sm";

const validClass = "border-warm-gray-200";
const invalidClass = "border-red-500 focus:ring-red-500";

export function FormField(props: Props) {
  const { id, label, error, required, as, ...rest } = props;
  const errorId = `${id}-error`;
  const ariaProps = error ? { "aria-describedby": errorId, "aria-invalid": true as const } : {};

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-off-black">
        {label}
        {required && (
          <span className="text-primary ml-1" aria-hidden>
            *
          </span>
        )}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={(props as TextareaProps).rows ?? 5}
          required={required}
          className={`${fieldClass} ${error ? invalidClass : validClass} resize-y`}
          {...ariaProps}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === "select" ? (
        <select
          id={id}
          name={id}
          required={required}
          className={`${fieldClass} ${error ? invalidClass : validClass} appearance-none`}
          {...ariaProps}
          defaultValue={(props as SelectProps).defaultValue ?? ""}
          value={(props as SelectProps).value}
          onChange={(props as SelectProps).onChange}
          disabled={(props as SelectProps).disabled}
        >
          {(props as SelectProps).children}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          required={required}
          className={`${fieldClass} ${error ? invalidClass : validClass}`}
          {...ariaProps}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
