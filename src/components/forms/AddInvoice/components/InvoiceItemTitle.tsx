import { useState } from "react";

import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { InvoiceItemSuggestionsResponse } from "../types";

interface InvoiceItemTitleProps {
  index: number;
}

const DEBOUNCE_TIME = 150;

export default function InvoiceItemTitle({ index }: InvoiceItemTitleProps) {
  const [search, setSearch] = useState<string>("");

  const { control, setValue } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: `items[${index}].title`,
    control,
  });

  // const { data, isFetching } = useQuery({
  //     queryKey: ['invoiceItemSuggestions', _id, search],
  //     queryFn: () => getInvoiceItemSuggestions({ search, company: _id }),
  //     enabled: !!search,
  // });

  const data: InvoiceItemSuggestionsResponse = [];
  const currency = "USD";

  const debouncedInputChange = useDebouncedCallback((value) => {
    setSearch(value);
  }, DEBOUNCE_TIME);

  return (
    <Autocomplete
      {...field}
      allowsCustomValue
      isRequired
      allowsEmptyCollection={false}
      aria-label={`Item ${index + 1} title`}
      defaultInputValue={field.value}
      defaultSelectedKey={field.value}
      errorMessage=""
      inputProps={{
        classNames: {
          inputWrapper: "h-[42px] shadow-sm border border-divider bg-light",
          label: `font-medium`,
          input: "h-[42px]",
        },
      }}
      isClearable={false}
      isInvalid={!!error}
      // isLoading={isFetching}
      label=""
      labelPlacement="outside"
      placeholder="Title"
      radius="md"
      selectorButtonProps={{
        className: "hidden",
      }}
      size="md"
      value={field.value}
      variant="bordered"
      onInput={(e) => {
        const inputValue = (e.target as HTMLInputElement).value;
        setValue(`items[${index}].title`, inputValue);
        debouncedInputChange(inputValue);
      }}
      onSelectionChange={(value: any) => {
        if (field.value !== value) {
          const selected = data?.find((item) => item.title === value);
          if (!selected) return;
          field.onChange(value);
          setValue(`items[${index}].rate`, selected.rate[0]);
        }
      }}
    >
      {data?.map((option) => (
        <AutocompleteItem
          key={option.title}
          hideSelectedIcon
          shouldHighlightOnFocus
          description={`Price: ${currency}${option.rate.join(", ")}`}
          textValue={option.title}
          title={option.title}
          value={option.title}
        />
      )) || []}
    </Autocomplete>
  );
}
