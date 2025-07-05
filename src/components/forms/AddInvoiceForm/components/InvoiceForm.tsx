import DatePicker from "@components/atomic/DatePicker";
import Input from "@components/atomic/Input";
import MobileNumberInput from "@components/atomic/MobileNumberInput";
import SelectInputWithSearch from "@components/atomic/SelectInputWithSearch";
import { Divider, Spacer, useDisclosure } from "@heroui/react";
import DropImage from "./DropImage";
import InvoiceTitle from "./InvoiceTitle";
import ChooseCustomer from "./ChooseCustomer";
import InvoiceNumberInput from "./InvoiceNumberInput";
import CurrencyPicker from "@components/atomic/CurrencyPicker";
import InvoiceItems from "./InvoiceItems";
import TermsAndConditions from "./TermsAndConditions";
import Totals from "./Totals";
import AddInvoiceUserModal from "./AddInvoiceUserModal";

const uaePlacesOfSupply = [
  { value: "AB", label: "Abu Dhabi" },
  { value: "AJ", label: "Ajman" },
  { value: "DU", label: "Dubai" },
  { value: "FU", label: "Fujairah" },
  { value: "RA", label: "Ras Al Khaimah" },
  { value: "SH", label: "Sharjah" },
  { value: "UM", label: "Umm Al Quwain" },
];

type InvoiceFormProps = {
  setRole: (role: "biller" | "customer") => void;
  setSelectedUser: any;
};

function InvoiceForm({ setRole, setSelectedUser }: InvoiceFormProps) {
  const addCustomerModal = useDisclosure();
  const editCustomerModal = useDisclosure();

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <div className="size-[180px] flex-shrink-0">
          <DropImage maxSize={1 * 1024 * 1024} name="logo" />
        </div>
        <InvoiceTitle />
      </div>

      <Spacer y={6} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 space-y-3">
          <span className="text-md font-semibold">Billed By</span>
          <Input
            isRequired
            label=""
            name="biller.name"
            placeholder="Biller name"
          />
          <Input
            isRequired
            label=""
            name="biller.email"
            placeholder="Biller email"
          />
          <MobileNumberInput
            isRequired
            label=""
            nameCode="biller.country_code"
            nameMobile="biller.mobile"
          />
          <Input
            isRequired
            label=""
            name="biller.address"
            placeholder="Address"
          />
          <Input
            isRequired
            label=""
            name="biller.trn"
            placeholder="TRN (If any)"
          />
        </div>
        <div className="col-span-1 space-y-3">
          <span className="text-md font-semibold">Billed to</span>
          <ChooseCustomer
            addCustomerModal={addCustomerModal}
            editCustomerModal={editCustomerModal}
            setRole={setRole}
            setSelectedUser={setSelectedUser}
          />
          <Input
            isRequired
            label=""
            name="customer.name"
            placeholder="Customer name"
          />
          <Input
            isRequired
            label=""
            name="customer.email"
            placeholder="Email ID"
          />
          <Input
            isRequired
            label=""
            name="customer.address"
            placeholder="Address"
          />
          <MobileNumberInput
            isRequired
            label=""
            nameCode="customer.country_code"
            nameMobile="customer.mobile"
          />
          <Input
            isRequired
            label=""
            name="customer.trn"
            placeholder="TRN (If any)"
          />
        </div>
        <div className="col-span-1 space-y-3">
          <span className="text-md font-semibold">Invoice Details</span>
          <InvoiceNumberInput />
          <DatePicker
            disableFutureDates
            isRequired
            showMonthAndYearPickers
            label=""
            name="invoice_date"
            startContent={
              <span className="text-sm whitespace-nowrap text-default-800">
                Invoice Date:{" "}
              </span>
            }
          />
          <DatePicker
            disablePastDates
            isRequired
            showMonthAndYearPickers
            label=""
            name="due_date"
            startContent={
              <span className="text-sm whitespace-nowrap text-default-800">
                Due Date:{" "}
              </span>
            }
          />

          <CurrencyPicker
            isDisabled
            isRequired
            label=""
            name="currency"
            placeholder="Select"
            startContent={<span className="text-sm">Currency: </span>}
          />
          <SelectInputWithSearch
            label=""
            name="place_of_supply"
            options={uaePlacesOfSupply}
            placeholder="Select place of supply"
          />
        </div>
      </div>
      <Spacer y={6} />
      <InvoiceItems />
      <Spacer y={6} />
      <Divider />
      <Spacer y={6} />
      <h4 className="text-md font-semibold">Additional Details:</h4>
      <Spacer y={4} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap">
        <TermsAndConditions />
        <Totals />
      </div>
      <Spacer y={3} />

      {addCustomerModal.isOpen ? (
                <AddInvoiceUserModal
                    isOpen={addCustomerModal.isOpen}
                    userRole="customer"
                    onClose={addCustomerModal.onClose}
                />
            ) : null}
    </>
  );
}

export default InvoiceForm;
