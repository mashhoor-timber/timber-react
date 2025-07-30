import { useEffect, useState } from "react";

import { Spacer, Spinner, useDisclosure } from "@heroui/react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import Button from "@components/atomic/Button";
import { getLocalTimeZone, today } from "@internationalized/date";
import InvoiceForm from "./components/InvoiceForm";
import { invoiceSchema } from "./schema";
import { CreateInvoiceValues } from "./types";
import { useTimberClient } from "@providers/TimberProvider";
import Form from "@components/atomic/Form";
import { useQuery } from "@tanstack/react-query";

type AddInvoiceProps = {
  onSuccess?: (values: CreateInvoiceValues) => void;
};

function AddInvoice({ onSuccess }: AddInvoiceProps) {
  const timberClient = useTimberClient();

  const {
    data: company,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => timberClient.company.get(),
    select: (res: any) => res.data.data,
    enabled: !!timberClient,
  });

  const addCustomerModal = useDisclosure();
  const editCustomerModal = useDisclosure();
  const [role, setRole] = useState<"biller" | "customer" | "vendor">("customer");
  const [selectedUser, setSelectedUser] = useState();

  if (!timberClient) {
    return <div>Loading Timber Client...</div>;
  }
  if (isPending) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (isError) {
    return <div>Error loading company data.</div>;
  }
  if (!company) {
    return <div>No company data found.</div>;
  }

  const AddInvoiceInitialValues: CreateInvoiceValues = {
    mode: "create",
    company: company?._id || "",
    title: "Invoice",
    isTitleChanged: false,
    customer: {
      customer_id: "",
      name: "",
      email: "",
      trn: "",
      country_code: "+971",
      mobile: "",
      address: "",
    },
    biller: {
      biller_id: company?._id,
      name: company?.name || "",
      email: company?.email || "",
      country_code: company?.country_code || "+971",
      mobile: company?.mobile || "",
      address: company?.address || "",
      trn: company?.trn || "",
    },
    invoice_number: "",
    invoice_date: today(getLocalTimeZone()),
    due_date: today(getLocalTimeZone()),
    currency: company?.currency || "AED",
    payment_method: "bank",
    items: [
      {
        id: uuidv4(),
        title: "",
        quantity: 1,
        rate: 0,
        vat: 5,
        discount: 0,
        total: 0.0,
      },
    ],
    terms: "",
    notes: "",
    sub_total: 0,
    vat_total: 0,
    discount_total: 0,
    shipping: 0,
    total: 0,
    amount_paid: 0,
    amount_due: 0,
    status: 'unpaid',
    wafeq: false,
    zoho: false,
    logo: null,
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      ...values,
      invoice_date: format(values.invoice_date, "yyyy-MM-dd"),
      due_date: format(values.due_date, "yyyy-MM-dd"),
    };
    const invoice=await timberClient.vendorPayment.create(payload)
    if (onSuccess) onSuccess(payload);
  };

  return (
    <Form
      defaultValues={AddInvoiceInitialValues}
      resetOnSubmit={true}
      schema={invoiceSchema}
      onSubmit={handleSubmit}
    >
      {({ formState, getValues, trigger }) => {
        return (
          <div className="p-3 md:p-6">
            <InvoiceForm setRole={setRole} setSelectedUser={setSelectedUser} />
            <div className="flex justify-end items-center gap-4">
              <Button
                className="w-[320px]"
                color="primary"
                isLoading={formState.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        );
      }}
    </Form>
  );
}

export default AddInvoice;

export { AddInvoice };
