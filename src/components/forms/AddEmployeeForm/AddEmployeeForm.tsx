import Button from "@components/atomic/Button";
import DatePicker from "@components/atomic/DatePicker";
import Input from "@components/atomic/Input";
import MobileNumberInput from "@components/atomic/MobileNumberInput";

import { EmployeeSchema } from "./schema";
import Form from "@components/atomic/Form";
import { useTimberClient } from "providers/TimberProvider";
import { AddEmployeeFormProps, EmployeeFormData } from "./types";
import { Spacer } from "@heroui/react";

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  onSuccess,
  onError,
}) => {
  const timberClient = useTimberClient();

  const initialValues: EmployeeFormData = {
    _id: "",
    employee_id: "",
    name: "",
    designation: "",
    mobile: "",
    basic_salary: 0,
    allowance: 0,
    joining_date: "",
    country_code: "+971",
    is_active: true,
  };

  const onSubmit = async (values: EmployeeFormData) => {
    try {
      const employee: EmployeeFormData = {
        ...values,
      };
      await timberClient.employee.create(employee);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <Form
      defaultValues={initialValues}
      schema={EmployeeSchema}
      onSubmit={onSubmit}
      resetOnSubmit
    >
      {({ formState: { isSubmitting, isValid, isDirty, errors } }) => (
        <div className="space-y-3">
          <Input
            isRequired
            label="Employee Name"
            name="name"
            placeholder="Enter employee name"
          />
          <Spacer y={2} />
          <Input
            isRequired
            label="Employee ID"
            name="employee_id"
            placeholder="Enter employee ID"
          />
          <Spacer y={2} />

          <Input
            isRequired
            label="Designation"
            name="designation"
            placeholder="Enter designation"
          />
          <Spacer y={2} />

          <Input
            isRequired
            label="Basic Salary"
            name="basic_salary"
            placeholder="Enter basic salary"
          />
          <Spacer y={2} />

          <Input
            isRequired
            label="Allowance"
            name="allowance"
            placeholder="Enter allowance"
          />
          <Spacer y={2} />

          <MobileNumberInput
            isRequired
            label="Mobile"
            nameCode="country_code"
            nameMobile="mobile"
          />
          <Spacer y={2} />

          <DatePicker
            disableFutureDates
            isRequired
            showMonthAndYearPickers
            label="Joining Date"
            name="joining_date"
          />
          <Spacer y={2} />
          <Button color="primary" isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </div>
      )}
    </Form>
  );
};
