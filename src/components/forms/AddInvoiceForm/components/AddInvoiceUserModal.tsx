import { useState } from "react";

import { Divider, Spacer } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import Button from "@components/atomic/Button";
import Input from "@components/atomic/Input";
import Modal, {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@components/atomic/Modal";
import Textarea from "@components/atomic/Textarea";

import { InvoiceCustomerPayload } from "../types";
import Form from "@components/atomic/Form";
import { UserFormData } from "@components/forms/AddUserForm";
import { useTimberClient } from "@providers/TimberProvider";
import { userSchema } from "@components/forms/AddUserForm/schema";
import Select, { SelectItem } from "@components/atomic/Select";
import MobileNumberInput from "@components/atomic/MobileNumberInput";

type AddInvoiceUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userRole: "biller" | "customer" | "vendor";
  apiQuery?: {};
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export default function AddInvoiceUserModal({
  isOpen,
  onClose,
  userRole,
  apiQuery = {},
  onSuccess,
  onError,
}: AddInvoiceUserModalProps) {
  const timberClient = useTimberClient();
  const onSubmit = async (values: UserFormData) => {
    try {
      const payload: UserFormData = {
        ...values,
        logo: values.logo ? values.logo[0] : null,
      };
      await timberClient.customer.create(payload);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const initialValues: UserFormData = {
    name: "",
    email: "",
    mobile: "",
    country_code: "+971",
    country: "",
    city: "",
    address: "",
    role: "customer",
  };

  return (
    <Modal isOpen={isOpen} size="xl" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          Add New {userRole === "biller" ? "Biller" : "Customer"}
        </ModalHeader>
        <Form
          defaultValues={initialValues}
          schema={userSchema}
          onSubmit={onSubmit}
          resetOnSubmit
        >
          {({ formState: { isSubmitting, isValid, isDirty, errors } }) => (
            <ModalBody>
              <div className="">
                <Input
                  isRequired
                  label="Company Name"
                  name="name"
                  placeholder="Enter name"
                />
                <Spacer y={2} />
                <Select
                  isRequired
                  name="role"
                  defaultSelectedKeys={["customer"]}
                  label="Role"
                  placeholder="Select role"
                >
                  <SelectItem key="customer" value="customer">
                    Customer
                  </SelectItem>
                  <SelectItem key="biller" value="biller">
                    Biller
                  </SelectItem>
                  <SelectItem key="vendor" value="vendor">
                    Vendor
                  </SelectItem>
                </Select>
                <Spacer y={2} />
                <Input
                  isRequired
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                />
                <Spacer y={2} />
                <MobileNumberInput
                  isRequired
                  label="Phone Number"
                  nameCode="country_code"
                  nameMobile="mobile"
                />
                <Spacer y={2} />
                <Textarea
                  isRequired
                  label="Address"
                  minRows={4}
                  name="address"
                  placeholder="Please enter an address"
                />
                <Spacer y={2} />
                <Input name="logo" type="file" label="Logo" />
                <Spacer y={2} />
                <Input
                  label="TRN"
                  name="trn"
                  placeholder="Enter TRN (if any)"
                />
                <Spacer y={2} />
                <div className="flex justify-end">
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
                <Spacer y={2} />
              </div>
            </ModalBody>
          )}
        </Form>
      </ModalContent>
    </Modal>
  );
}
