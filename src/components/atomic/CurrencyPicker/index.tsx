import { useMemo, useState } from "react";

import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";

import { currencyOptions } from "./currency";

interface SelectInputWithSearchProps
  extends Omit<AutocompleteProps, "onChange" | "options" | "children"> {
  name: string;
  label?: string;
}

function EndContent({ value }: any) {
  if (!value) return null;
  const opt = currencyOptions.find((option) => option.value === value);
  return <span>{opt?.symbol}</span>;
}

function RhfCurrencyPicker({ name, ...props }: SelectInputWithSearchProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredOptions = useMemo(() => {
    if (searchValue === "") return currencyOptions;
    return currencyOptions.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

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
      {...props}
      aria-label={props.label || "Currency picker"}
      defaultSelectedKey={field.value}
      inputProps={{
        classNames: {
          inputWrapper: "h-[42px] border border-divider bg-light",
          label: `font-medium ${
            props.labelPlacement === "outside-left" ? "w-[130px]" : ""
          }`,
          input: `${props.labelPlacement === "outside-left" ? "h-[42px]" : ""}`,
        },
      }}
      isClearable={false}
      isInvalid={!!error}
      radius="md"
      size="md"
      validationBehavior="aria"
      variant="bordered"
      onInput={(e) => {
        const inputValue = (e.target as HTMLInputElement).value;
        setSearchValue(inputValue);
      }}
      onSelectionChange={(value: any) => {
        if (field.value !== value) {
          field.onChange(name, value);
        }
      }}
      labelPlacement="outside"
      // startContent={<EndContent value={field.value} />}
      errorMessage={error?.message}
    >
      {filteredOptions?.map((option) => (
        <AutocompleteItem key={option?.value} value={option?.value}>
          {option?.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}

export default function CurrencyPicker(props: SelectInputWithSearchProps) {
  return <RhfCurrencyPicker {...props} />;
}
