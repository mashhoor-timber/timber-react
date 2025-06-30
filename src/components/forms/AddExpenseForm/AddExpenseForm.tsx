import React, { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, today } from "@internationalized/date";
import { FormProvider, useForm } from "react-hook-form";

import Button from "../../atomic/Button";
import DatePicker from "../../atomic/DatePicker";
import Input from "../../atomic/Input";
import SelectInputWithSearch from "../../atomic/SelectInputWithSearch";

import { useTimberQuery } from "../../../hooks/useTimberQuery";
import { defaultExpenseSchema } from "../../../utils/validation";
import { DEFAULT_PAYMENT_METHODS, DEFAULT_CATEGORIES } from "./constants";
import { AddExpenseFormProps, ExpenseFormData } from "./types";
import ChooseCategory from "./components/ChooseCategory";
import ConfirmModal from "./components/ConfirmModal";
import AddCategoryModal from "./components/AddCategoryModal";
import CurrencyInput from "@components/atomic/CurrencyInput";

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  customCurrencyOptions,
  customPaymentMethods,
  onSubmit,
  onSuccess,
  onError,
  isSubmitting = false,
  customValidationSchema,
  defaultCurrency,
}) => {
  const [pendingExpense, setPendingExpense] = useState(null);
  const [formKey, setFormKey] = useState(Date.now());
  const addCategoryModal = useDisclosure();
  const similarExpenseModal = useDisclosure();

  const initialValues: ExpenseFormData = {
    type: "",
    payment_method: "",
    amount: 0,
    category: "",
    merchant: "",
    date: today(getLocalTimeZone()),
    currency: "",
  };

  const handleSubmit = async (values: ExpenseFormData, { resetForm }: any) => {
    try {
      const payload = {
        ...values,
        date: values.date.toString(),
      };

      await onSubmit(payload);
      resetForm();
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const validationSchema = customValidationSchema || defaultExpenseSchema;

  const methods = useForm({
    defaultValues: initialValues,
    // resolver: yupResolver<any>(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  return (
    <>
      <FormProvider {...methods}>
        <div className="space-y-3">
          <Input isRequired formLib="rhf" name="type" placeholder="Type" />
          <Input
            isRequired
            formLib="rhf"
            name="merchant"
            placeholder="Merchant"
          />

          <ChooseCategory key={formKey} addCategoryModal={addCategoryModal} />

          <SelectInputWithSearch
            key={`${formKey}payment`}
            isRequired
            formType="rhf"
            name="payment_method"
            options={customPaymentMethods || []}
            placeholder="Payment Method"
          />

          <CurrencyInput
            currencyName="currency"
            defaultCurrency={defaultCurrency}
            currencyOptions={customCurrencyOptions || []}
            label="Amount"
            labelPlacement="outside-left"
            name="amount"
            placeholder="Enter amount"
            formLib="rhf"
            control={methods.control}
          />

          {/*           
          <Input
            isRequired
            endContent={<span className="text-xs text-default-500">"AED"</span>}
            formLib="rhf"
            name="amount"
            placeholder="Amount"
            type="number"
          /> */}

          <DatePicker
            disableFutureDates
            isRequired
            formType="rhf"
            name="date"
          />

          <Button
            fullWidth
            color="primary"
            isLoading={isSubmitting}
            type="submit"
            onClick={methods.handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </div>
      </FormProvider>

      {addCategoryModal?.isOpen && (
        <AddCategoryModal
          isOpen={addCategoryModal.isOpen}
          onClose={addCategoryModal.onClose}
        />
      )}

      {similarExpenseModal?.isOpen && (
        <ConfirmModal
          isOpen={similarExpenseModal.isOpen}
          message="You have already added a similar expense today. Do you want to add it anyway?"
          onClose={similarExpenseModal.onClose}
          onConfirm={() => {
            if (pendingExpense) {
              handleSubmit(pendingExpense, true);
              similarExpenseModal.onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default AddExpenseForm;
