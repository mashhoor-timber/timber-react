import { InputProps, Input as NextInput } from "@heroui/input";
import clsx from "clsx";
import { useController, useFormContext } from "react-hook-form";

interface CurrencyInputProps extends InputProps {
  name: string;
  currencyName: string;
  currencyOptions: { label: string; value: string }[];
  defaultCurrency?: string;
  isCurrencyDisabled?: boolean;
}

export default function CurrencyInput({
  name,
  currencyName,
  currencyOptions,
  defaultCurrency,
  isCurrencyDisabled,
  ...props
}: CurrencyInputProps) {
  const { control, setValue } = useFormContext();
  const {
    field: { value, onChange, onBlur, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <NextInput
      {...field}
      classNames={{
        inputWrapper: clsx(
          "border border-default-200 shadow-none",
          props.disabled && "bg-default-100"
        ),
        label: "text-sm mt-1 font-medium",
        input: "text-sm placeholder:text-sm",
      }}
      errorMessage={error?.message}
      isInvalid={!!error}
      labelPlacement="outside"
      radius="sm"
      size="lg"
      startContent={
        <div className="flex items-center">
          <label className="sr-only" htmlFor={`${name}-currency`}>
            Currency
          </label>
          <select
            aria-label="Currency"
            className="outline-none border-0 bg-transparent text-default-400 text-small"
            defaultValue={defaultCurrency}
            disabled={isCurrencyDisabled}
            id={`${name}-currency`}
            name={`${name}-currency`}
            value={value?.[currencyName]}
            onChange={(e) => setValue(currencyName, e.target.value)} 
          >
            {currencyOptions?.map((currency: any) => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
        </div>
      }
      value={value}
      variant="bordered"
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
}
