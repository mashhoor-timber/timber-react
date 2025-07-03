import { Divider, Spacer } from "@heroui/react";
import Button from "@components/atomic/Button";
import Input from "@components/atomic/Input";

import Textarea from "@components/atomic/Textarea";

import { userSchema } from "./schema";
import { AddUserFormProps, UserFormData } from "./types";
import Form from "@components/atomic/Form";

import MobileNumberInput from "@components/atomic/MobileNumberInput";
import Select, { SelectItem } from "@components/atomic/Select";
import { useTimberClient } from "providers/TimberProvider";

export const AddUserForm: React.FC<AddUserFormProps> = ({
  onSuccess,
  onError,
}) => {
  const timberClient = useTimberClient();

  const onSubmit = async (values: UserFormData) => {
    try {
      const payload: UserFormData = {
        ...values,
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
    trn: "",
    role: "customer",
  };

  return (
    <Form
      defaultValues={initialValues}
      schema={userSchema}
      onSubmit={onSubmit}
      resetOnSubmit
    >
      {({ formState: { isSubmitting, isValid, isDirty, errors } }) => (
        <div className="space-y-3">
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
          <Input label="TRN" name="trn" placeholder="Enter TRN (if any)" />
          <Spacer y={2} />
          <Button color="primary" type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        </div>
      )}
    </Form>
  );
};
