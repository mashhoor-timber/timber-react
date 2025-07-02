import * as Yup from "yup";

export const defaultExpenseSchema = Yup.object().shape({
  type: Yup.string().required("Expense type is required"),
  merchant: Yup.string().required("Merchant name is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  payment_method: Yup.string().required("Payment method is required"),
  date: Yup.mixed().required("Date is required"),
  category: Yup.string(),
  description: Yup.string(),
});

export const createCustomExpenseSchema = (customRules: Record<string, any>) => {
  return defaultExpenseSchema.shape(customRules);
};
