import React, { useState } from "react";
import { Spacer, useDisclosure } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";

import Button from "../../atomic/Button";
import DatePicker from "../../atomic/DatePicker";
import Input from "../../atomic/Input";
import SelectInputWithSearch from "../../atomic/SelectInputWithSearch";

import { expenseSchema } from "./schema";
import { DEFAULT_PAYMENT_METHODS } from "./constants";
import { AddExpenseFormProps, ExpenseFormData } from "./types";
import ChooseCategory from "./components/ChooseCategory";
import AddCategoryModal from "./components/AddCategoryModal";
import Form from "@components/atomic/Form";
import { useTimberClient } from "providers/TimberProvider";

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  customPaymentMethods,
  onSuccess,
  onError,
  defaultCurrency,
}) => {
  const [formKey, setFormKey] = useState(Date.now());
  const addCategoryModal = useDisclosure();
  const timberClient = useTimberClient();

  const initialValues: ExpenseFormData = {
    type: "",
    payment_method: "",
    amount: 0,
    category: "",
    merchant: "",
    date: today(getLocalTimeZone()),
    currency: defaultCurrency || "AED",
  };

  const validationSchema = expenseSchema;

  const onSubmit = async (values: ExpenseFormData) => {
    try {
      const payload = {
        ...values,
        date: values.date.toString(),
      };

      await timberClient.expense.create(payload);
      setFormKey(Date.now());
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const paymentMethodOptions = [
    ...(customPaymentMethods || []),
    ...DEFAULT_PAYMENT_METHODS,
  ];

  return (
    <>
      <Form
        defaultValues={initialValues}
        schema={validationSchema}
        onSubmit={onSubmit}
        resetOnSubmit
      >
        {({ formState: { isSubmitting, isValid, isDirty, errors } }) => (
          <div className="space-y-3">
            {JSON.stringify(errors)}
            <Input isRequired name="type" placeholder="Type" />
            <Spacer y={3} />
            <Input isRequired name="merchant" placeholder="Merchant" />
            <Spacer y={3} />

            <ChooseCategory key={formKey} addCategoryModal={addCategoryModal} />
            <Spacer y={3} />

            <SelectInputWithSearch
              key={`${formKey}payment`}
              isRequired
              name="payment_method"
              options={paymentMethodOptions || []}
              placeholder="Payment Method"
            />
            <Spacer y={3} />

            <Input
              isRequired
              endContent={
                <span className="text-xs text-default-500">
                  {defaultCurrency || "AED"}
                </span>
              }
              name="amount"
              placeholder="Enter amount"
              type="number"
            />
            <Spacer y={3} />

            <DatePicker disableFutureDates isRequired name="date" />
            <Spacer y={3} />
            <Button
              fullWidth
              color="primary"
              // isDisabled={!isValid || !isDirty}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}
      </Form>
      {addCategoryModal?.isOpen && (
        <AddCategoryModal
          isOpen={addCategoryModal.isOpen}
          onClose={addCategoryModal.onClose}
        />
      )}
    </>
  );
};

export default AddExpenseForm;
