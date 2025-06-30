/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-extraneous-dependencies
import { InputProps, Input as NextInput } from "@heroui/input";
import { Field, FieldProps } from "formik";
import { Control, useController } from "react-hook-form";

interface CurrencyInputProps extends InputProps {
  name: string;
  currencyName: string; // Name for currency field in Formik
  currencyOptions: { label: string; value: string }[];
  defaultCurrency?: string;
  isCurrencyDisabled?: boolean;
  formLib?: "formik" | "rhf";
}

function FormikCurrencyInput({
  name,
  currencyName,
  currencyOptions,
  defaultCurrency,
  isCurrencyDisabled,
  ...props
}: CurrencyInputProps) {
  return (
    <Field name={name}>
      {({
        field,
        form: { touched, errors, setFieldValue, values },
      }: FieldProps) => {
        const error = touched[name] && errors[name];
        return (
          <NextInput
            {...field}
            {...props}
            classNames={{
              inputWrapper: "h-[42px] border border-divider bg-white",
              label: `font-medium ${
                props.labelPlacement === "outside-left" ? "w-[150px]" : ""
              }`,
              input: `${
                props.labelPlacement === "outside-left" ? "h-[42px]" : ""
              }`,
              base: `${props.labelPlacement === "outside-left" ? "" : ""}`,
            }}
            errorMessage={error as string}
            isInvalid={!!error}
            radius="md"
            size="md"
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
                  value={values[currencyName]}
                  onChange={(e) => setFieldValue(currencyName, e.target.value)} // Update currency value in Formik
                >
                  {currencyOptions.map((currency: any) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>
            }
            validationBehavior="aria"
            variant="bordered"
            onChange={(e) => setFieldValue(name, e.target.value)}
          />
        );
      }}
    </Field>
  );
}

function RhfCurrencyInput({
  name,
  currencyName,
  currencyOptions,
  defaultCurrency,
  isCurrencyDisabled,
  control, // Added control prop
  ...props
}: CurrencyInputProps & { control: Control<any> }) {
  // Added Control type
  const {
    field: amountField,
    fieldState: { error: amountError },
  } = useController({
    name,
    control,
  });

  const {
    field: currencyField,
    fieldState: { error: currencyError },
  } = useController({
    name: currencyName,
    control,
    defaultValue: defaultCurrency, // Use defaultCurrency here
  });

  return (
    <NextInput
      {...amountField}
      {...props}
      classNames={{
        inputWrapper: "h-[42px] border border-divider bg-white",
        label: `font-medium ${
          props.labelPlacement === "outside-left" ? "w-[150px]" : ""
        }`,
        input: `${props.labelPlacement === "outside-left" ? "h-[42px]" : ""}`,
        base: `${props.labelPlacement === "outside-left" ? "" : ""}`,
      }}
      errorMessage={amountError?.message}
      isInvalid={!!amountError}
      radius="md"
      size="md"
      startContent={
        <div className="flex items-center">
          <label className="sr-only" htmlFor={`${name}-currency`}>
            Currency
          </label>
          <select
            aria-label="Currency"
            className="outline-none border-0 bg-transparent text-default-400 text-small"
            disabled={isCurrencyDisabled}
            id={`${name}-currency`}
            {...currencyField} // Spread currencyField props instead of manual value/onChange
          >
            {currencyOptions.map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
        </div>
      }
      validationBehavior="aria"
      variant="bordered"
    />
  );
}

type FormikCustomProps = {
  formLib?: "formik";
  control?: never;
} & Omit<CurrencyInputProps, "formLib">;

type RhfCustomProps = {
  formLib: "rhf";
  control: Control<any>;
} & Omit<CurrencyInputProps, "formLib">;

type CustomInputProps = FormikCustomProps | RhfCustomProps;

export default function CurrencyInput(props: CustomInputProps) {
  if (props.formLib === "rhf") {
    return <RhfCurrencyInput {...props} />;
  }
  return <FormikCurrencyInput {...props} />;
}
