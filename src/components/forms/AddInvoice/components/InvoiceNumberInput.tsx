import { useEffect } from "react";

import { useDisclosure } from "@heroui/react";
import clsx from "clsx";
import { useController, useFormContext } from "react-hook-form";

import Button from "@components/atomic/Button";
import Input from "@components/atomic/Input";
// import { useAppSelector } from "@hooks/store";

// import { getNextInvoiceNumber } from "../../api/invoiceNumber";
import { CreateInvoiceValues } from "../types";
// import InvoiceNumberSettingsModal from "../InvoiceNumberSettingsModal";
import SettingsIcon from "assets/icons/SettingsIcon";

export default function InvoiceNumberInput() {
  const invoiceNumberSettingsModal = useDisclosure();
  const { control } = useFormContext<CreateInvoiceValues>();
  const {
    field: { onChange },
  } = useController({
    name: "invoice_number",
    control,
  });

  const {
    field: { value },
  } = useController({
    name: "mode",
    control,
  });

  // const company = useAppSelector(state => state.company);
  // const { data, isPending, isRefetching } = useQuery({
  //     queryKey: ['getNextInvoiceNumber', company?._id],
  //     queryFn: () => getNextInvoiceNumber({ company: company?._id }),
  //     staleTime: 0,
  //     enabled: value === 'create',
  // });

  // useEffect(() => {
  //     if (!data || value === 'edit') return;
  //     if (data?.enabled) {
  //         onChange(data.next_invoice_number);
  //     } else {
  //         onChange('', { shouldTouch: false });
  //     }
  // }, [data]);

  return (
    <>
      <Input
        isRequired
        endContent={
          <Button
            isIconOnly
            className={clsx("p-0 min-w-0", value === "edit" && "hidden")}
            color="icon"
            onClick={invoiceNumberSettingsModal.onOpen}
          >
            <SettingsIcon className="text-default-500" height={16} width={16} />
          </Button>
        }
        isDisabled={value === "edit"}
        // isLoading={isPending || isRefetching}
        label=""
        name="invoice_number"
        placeholder="Invoice number"
        // readOnly={data?.enabled}
        startContent={
          <span className="text-sm whitespace-nowrap">Invoice No: </span>
        }
      />
      {/* {invoiceNumberSettingsModal.isOpen ? (
                <InvoiceNumberSettingsModal
                    isOpen={invoiceNumberSettingsModal.isOpen}
                    onClose={invoiceNumberSettingsModal.onClose}
                />
            ) : null} */}
    </>
  );
}
