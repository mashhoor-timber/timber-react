import { useState } from "react";

import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui/react";
import { Field, FieldProps } from "formik";
import { useController, useFormContext } from "react-hook-form";

interface DropDownOption {
  label: string;
  value: string | number;
}

interface SelectInputWithSearchProps
  extends Omit<AutocompleteProps, "onChange" | "options" | "children"> {
  name: string;
  label?: string;
  formType?: "formik" | "rhf";
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  className?: string;
  options: DropDownOption[];
  handleChange?: (value: string | number) => void;
  handleSearch?: (value: string) => void;
  isLoading?: boolean;
  isClearable?: boolean;
}

function FormikSelectInputWithSearch({
  name,
  label,
  placeholder,
  isDisabled,
  isRequired,
  className,
  options,
  handleChange,
  handleSearch,
  isLoading,
  isClearable,
  ...props
}: SelectInputWithSearchProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Field name={name}>
      {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
        const error: any = touched[name] && errors[name];

        return (
          <Autocomplete
            {...field}
            aria-label={label}
            defaultSelectedKey={field.value}
            disabled={isDisabled}
            errorMessage={error as string}
            inputProps={{
              classNames: {
                inputWrapper:
                  "h-[42px] shadow-sm border border-divider bg-light",
                label: `font-medium ${
                  props.labelPlacement === "outside-left" ? "w-[130px]" : ""
                }`,
                input: `${
                  props.labelPlacement === "outside-left" ? "h-[42px]" : ""
                }`,
              },
            }}
            isClearable={isClearable}
            isInvalid={!!error}
            isLoading={isLoading}
            isRequired={isRequired}
            label={label}
            labelPlacement={props.labelPlacement || "outside"}
            placeholder={placeholder}
            radius="md"
            size="md"
            validationBehavior="aria"
            variant="bordered"
            onInput={(e) => {
              const inputValue = (e.target as HTMLInputElement).value;
              setSearchValue(inputValue);
              if (handleSearch) handleSearch(inputValue);
            }}
            onSelectionChange={(value: any) => {
              if (field.value !== value) {
                setFieldValue(name, value);
              }
            }}
            {...props}
          >
            {filteredOptions?.map((option) => (
              <AutocompleteItem key={option?.value}>
                {option?.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        );
      }}
    </Field>
  );
}

function RhfSelectInputWithSearch({
  name,
  label,
  placeholder,
  isDisabled,
  isRequired,
  className,
  options,
  handleChange,
  handleSearch,
  isLoading,
  isClearable,
  ...props
}: SelectInputWithSearchProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Autocomplete
      {...field}
      aria-label={label}
      defaultSelectedKey={field.value}
      disabled={isDisabled}
      errorMessage={error?.message}
      inputProps={{
        classNames: {
          inputWrapper: "h-[42px] shadow-sm border border-divider bg-light",
          label: `font-medium ${
            props.labelPlacement === "outside-left" ? "w-[130px]" : ""
          }`,
          input: `${props.labelPlacement === "outside-left" ? "h-[42px]" : ""}`,
        },
      }}
      isClearable={isClearable}
      isInvalid={!!error}
      isLoading={isLoading}
      isRequired={isRequired}
      label={label}
      labelPlacement={props.labelPlacement || "outside"}
      placeholder={placeholder}
      radius="md"
      size="md"
      variant="bordered"
      onInput={(e) => {
        const inputValue = (e.target as HTMLInputElement).value;
        setSearchValue(inputValue);
        if (handleSearch) handleSearch(inputValue);
      }}
      onSelectionChange={(value: any) => {
        if (field.value !== value) {
          field.onChange(value);
        }
      }}
      {...props}
    >
      {filteredOptions?.map((option) => (
        <AutocompleteItem key={option?.value}>{option?.label}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
}

export default function SelectInputWithSearch({
  formType = "formik",
  ...props
}: SelectInputWithSearchProps) {
  if (formType === "formik") return <FormikSelectInputWithSearch {...props} />;
  return <RhfSelectInputWithSearch {...props} />;
}
