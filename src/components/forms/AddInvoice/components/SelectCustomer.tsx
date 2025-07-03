import React, { useMemo, useState } from "react";

import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  AutocompleteSection,
  Image,
} from "@heroui/react";

// import addProfileIcon from '@assets/icons/profile-add.svg';
// import user from '@assets/icons/user_profile.svg';

import {
  Invoice,
  InvoiceCustomer,
  InvoiceCustomerResponse,
  SuggestedCustomerResponse,
} from "../types";
import AddUserIcon from "assets/icons/AddUserIcon";
import user from "@assets/icons/user_profile.svg";
import ProfileIcon from "assets/icons/ProfileIcon";

interface Props extends Omit<AutocompleteProps, "children"> {
  buttonOnClick: () => void;
  editOnClick?: (id: InvoiceCustomer) => void;
  buttonText?: string;
  onSelChange?: (value: InvoiceCustomer | undefined) => void;
}

export default function SelectCustomer({
  buttonOnClick,
  editOnClick,
  buttonText,
  onSelChange,
  ...props
}: Props) {
  const [selected, setSelected] = React.useState<any>(null);

  const [query, setQuery] = useState("");
  // const { data, isFetching, isError } = useQuery({
  //     queryFn: () => queryFn({ page: 1, limit: 100, search: query }),
  //     queryKey: ['allInvoiceCustomers', query, queryKey],
  // });

  // const { data: suggestedCustomersData } = useQuery({
  //     queryFn: suggestedQueryFn,
  //     queryKey: ['suggestedCustomers', queryKey],
  // });

  const suggestedCustomersData: SuggestedCustomerResponse = {
    suggested_customers: [],
  };
  const data: InvoiceCustomerResponse = {
    invoice_customers: [],
    total: 0,
  };
  const isFetching = false;
  const isError = false;

  const selectedCustomer = useMemo(
    () => data?.invoice_customers.find((item) => item._id === selected),
    [data?.invoice_customers, selected]
  );

  const handleInputChange = (val: string) => {
    if (val === "add_user") {
      setQuery("");
    }
    // if (val.trim()) setQuery(val);
    // else setQuery('');
  };

  interface GroupedItems {
    [key: string]: InvoiceCustomer[];
  }

  const renderItems = () => {
    if (isError || !data || !data.total) return [];
    const groupedItems: GroupedItems = data.invoice_customers.reduce(
      (acc: any, item: InvoiceCustomer) => {
        const firstLetter = item.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(item);
        return acc;
      },
      {}
    );

    const list: any = Object.keys(groupedItems).map((letter) => (
      <AutocompleteSection
        key={letter}
        classNames={{
          heading: "font-medium ms-2",
        }}
        items={groupedItems[letter]}
        title={letter}
      >
        {(item) => (
          <AutocompleteItem
            key={item._id}
            className="capitalize"
            textValue={item.name}
          >
            <div className="flex items-center gap-2">
              {item.logo ? (
                <Image
                  alt={item.name}
                  className="size-8 rounded-full shadow-sm object-cover flex-shrink-0"
                  fallbackSrc={
                    <div className="size-8 rounded-full border bg-default-100" />
                  }
                  height={32}
                  radius="full"
                  src={item.logo}
                  width={32}
                />
              ) : (
                <ProfileIcon />
              )}
              <span className="truncate">{item.name}</span>
            </div>
          </AutocompleteItem>
        )}
      </AutocompleteSection>
    ));
    return list;
  };

  const renderSuggestedItems = () => {
    if (!suggestedCustomersData?.suggested_customers.length) return null;
    return (
      <AutocompleteSection
        classNames={{
          heading: "font-medium ms-2",
        }}
        title="Suggested"
      >
        {suggestedCustomersData.suggested_customers.map((item) => (
          <AutocompleteItem
            key={item._id}
            className="capitalize"
            textValue={item.name}
          >
            <div className="flex items-center gap-2">
              {item.logo ? (
                <Image
                  alt={item.name}
                  className="size-8 rounded-full shadow-sm object-cover flex-shrink-0"
                  fallbackSrc={
                    <div className="size-8 rounded-full border bg-default-100" />
                  }
                  height={32}
                  radius="full"
                  src={item.logo}
                  width={32}
                />
              ) : (
                <ProfileIcon />
              )}
              <span className="truncate">{item.name}</span>
            </div>
          </AutocompleteItem>
        ))}
      </AutocompleteSection>
    );
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
      isLoading={isFetching}
      label={props.label}
      labelPlacement="outside"
      placeholder={props.placeholder}
      radius="md"
      selectedKey={selected}
      startContent={
        selectedCustomer?.logo ? (
          <Image
            className="min-w-6 flex-shrink-0"
            height={24}
            radius="full"
            src={selectedCustomer?.logo}
            width={24}
          />
        ) : (
          <ProfileIcon width={24} height={24} />
        )
      }
      variant="bordered"
      onInputChange={handleInputChange}
      onSelectionChange={(item) => {
        if (item === "add_user") {
          setSelected(null);
          buttonOnClick();
        } else {
          setSelected(item);
          const sel = data?.invoice_customers.find((it) => it._id === item);
          onSelChange?.(sel);
        }
      }}
    >
      <AutocompleteSection title="">
        <AutocompleteItem
          key="add_user"
          className="mt-2"
          classNames={{
            selectedIcon: "hidden",
            base: "data-[pressed=true]:scale-[0.97] rounded-lg bg-[#F0F9FF] transition-transform-colors-opacity motion-reduce:transition-none",
          }}
          textValue="add_user"
        >
          <div className="flex items-center text-primary font-medium px-2 py-1 gap-2">
            <AddUserIcon height={24} width={24} />
            <span className="font-medium">{buttonText}</span>
          </div>
        </AutocompleteItem>
      </AutocompleteSection>
      {renderSuggestedItems()}
      {renderItems()}
    </Autocomplete>
  );
}
