import { useFormContext } from "react-hook-form";
import SelectCustomer from "./SelectCustomer";
import { InvoiceCustomer } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useTimberClient } from "@providers/TimberProvider";

type Props = {
  setRole: (role: "biller" | "customer" | "vendor") => void;
  addCustomerModal: any;
  editCustomerModal: any;
  setSelectedUser: any;
};

function ChooseCustomer({
  setRole,
  addCustomerModal,
  editCustomerModal,
  setSelectedUser,
}: Props) {
  const timberClient = useTimberClient();
  const {
    data: company,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => timberClient.company.get(),
    select: (res) => res.data,
    enabled: !!timberClient,
  });

  const handleAddUser = (userRole: "biller" | "customer" | "vendor") => {
    setRole(userRole);
    addCustomerModal.onOpen();
  };

  const handleEditUser = (item: any) => {
    setSelectedUser(item);
    editCustomerModal.onOpen();
  };

  const { setValue } = useFormContext();

  const handleCustomerChange = (value: InvoiceCustomer | undefined) => {
    if (!value) return;
    setValue("customer", { ...value, id: value._id }, { shouldValidate: true });
  };
  return (
    <SelectCustomer
      buttonOnClick={() => handleAddUser("vendor")}
      buttonText="Add Vendor"
      editOnClick={handleEditUser}
      label=""
      name="customer.customer_id"
      placeholder="Select saved vendor or add new vendor"
      onSelChange={handleCustomerChange}
    />
  );
}

export default ChooseCustomer;
