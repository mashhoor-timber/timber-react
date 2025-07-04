import { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  AutocompleteSection,
} from "@heroui/react";

import { ExpenseCategory } from "../types";
import CategoriesIcon from "../../../../assets/icons/CategoriesIcon";
import { useTimberClient } from "@providers/TimberProvider";

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
  const [query, setQuery] = useState<string>("");
  const [categoryData, setCategoryData] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const timberClient = useTimberClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await timberClient.expenseCategory.list({
          search: query,
          page: 1,
          limit: 10,
          sort: "",
          filters: "",
        });
        setCategoryData(data?.data?.expense_categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, timberClient]);

  const staticCategories = [
    { key: "travel", label: "Travel", value: "travel" },
    { key: "utilities", label: "Utilities", value: "utilities" },
    {
      key: "office_supplies",
      label: "Office Supplies",
      value: "office_supplies",
    },
    { key: "marketing", label: "Marketing", value: "marketing" },
  ];

  const dynamicCategories =
    categoryData?.map((item: any) => ({
      key: item.category?.value || item._id,
      label: item.category?.label || "Unknown Category",
      value: item.category?.value || item._id,
    })) || [];

  const categoryOptions = [...staticCategories, ...dynamicCategories];

  const renderItems = () => {
    if (!categoryOptions.length && !loading) {
      return (
        <AutocompleteItem key="no_data" isDisabled>
          No categories found
        </AutocompleteItem>
      );
    }

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
      isLoading={loading}
      aria-label={props.placeholder}
      inputProps={{
        classNames: {
          inputWrapper:
            "h-[42px] shadow-sm border border-divider bg-light ps-3",
          label: "font-medium",
        },
      }}
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
            <CategoriesIcon height={24} width={24} className="text-primary" />
            <span className="font-medium">{buttonText}</span>
          </div>
        </AutocompleteItem>
      </AutocompleteSection>
      <>{renderItems()}</>
    </Autocomplete>
  );
}
