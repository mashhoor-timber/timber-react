import { useEffect, useState } from "react";

import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  AutocompleteSection,
} from "@heroui/react";

import { ExpenseCategory } from "../types";
import CategoriesIcon from "./CategoriesIcon";
import { useTimberClient } from "providers/TimberProvider";

interface Props extends Omit<AutocompleteProps, "children"> {
  buttonOnClick: () => void;
  queryKey: string;
  buttonText?: string;
  onSelChange?: (value: any) => void;
  selectedKey?: string | null;
}

export default function SelectCategory({
  buttonOnClick,
  buttonText,
  onSelChange,
  queryKey,
  selectedKey,
  ...props
}: Props) {
  const [selected, setSelected] = useState<string | null>(selectedKey || null);
  const [query, setQuery] = useState("");
  const timberClient = useTimberClient();
  const [categoryData, setCategoryData] = useState<ExpenseCategory[]>([]);

  const expenseCategoryData: never[] = [];

  useEffect(() => {
    const fetchData = async () => {
      const data = await timberClient.expenseCategory.list({
        search: query,
      });
      setCategoryData(data?.expense_categories || []);
    };
    fetchData();
  }, [query]);

  // Map categories to match the `ExpenseCategory` type
  const categoryOptions = [
    {
      key: "travel",
      label: "Travel",
      value: "travel",
    },
    {
      key: "utilities",
      label: "Utilities",
      value: "utilities",
    },
    {
      key: "office_supplies",
      label: "Office Supplies",
      value: "office_supplies",
    },
    {
      key: "marketing",
      label: "Marketing",
      value: "marketing",
    },
    ...(categoryData?.map((item: any) => ({
      key: item.category?.value,
      label: item.category?.label,
      value: item.category?.value,
    })) || []),
  ];

  const renderItems: any = () => {
    if (!categoryOptions.length) return [];
    return categoryOptions.map((item) => (
      <AutocompleteItem
        key={item.value}
        className="capitalize"
        textValue={item.label}
      >
        <div className="flex items-center gap-2">
          <span className="truncate">{item.label}</span>
        </div>
      </AutocompleteItem>
    ));
  };

  const handleInputChange = (val: string) => {
    setQuery(val.trim());
  };

  return (
    <Autocomplete
      allowsCustomValue
      isClearable
      showScrollIndicators
      aria-label={props.placeholder}
      inputProps={{
        classNames: {
          inputWrapper:
            "h-[42px] shadow-sm border border-divider bg-light ps-3",
          label: "font-medium",
        },
      }}
      // isLoading={isFetching}
      label={props.label}
      labelPlacement="outside"
      placeholder={props.placeholder}
      radius="md"
      selectedKey={selected}
      variant="bordered"
      onInputChange={handleInputChange}
      onSelectionChange={(item) => {
        if (item === "add_category") {
          setSelected(null);
          buttonOnClick();
        } else {
          setSelected(item as string);
          const sel = categoryOptions.find((it) => it.value === item);
          onSelChange?.(sel);
        }
      }}
      {...props}
    >
      <AutocompleteSection title="">
        <AutocompleteItem
          key="add_category"
          className="mt-2"
          classNames={{
            selectedIcon: "hidden",
            base: "data-[pressed=true]:scale-[0.97] rounded-lg bg-[#F0F9FF] transition-transform-colors-opacity motion-reduce:transition-none",
          }}
          textValue="add_category"
        >
          <div className="flex items-center text-primary font-medium px-2 gap-2">
            {JSON.stringify(categoryData)}
            <CategoriesIcon height={24} width={24} className="text-primary" />
            <span className="font-medium">{buttonText}</span>
          </div>
        </AutocompleteItem>
      </AutocompleteSection>
      {renderItems()}
    </Autocomplete>
  );
}
