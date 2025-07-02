import { CalendarDate } from "@internationalized/date";

export interface ExpenseFormData {
  type: string;
  merchant: string;
  category: string;
  payment_method: string;
  currency: string;
  amount: number;
  date: CalendarDate | string;
  id?: string;
  company?: string;
}

export interface ExpenseCategory {
  _id: string;
  created_at: string;
  updated_at: string;
  category: {
    label: string;
    value: string;
  };
  company: string;
}

export interface CurrencyOption {
  label: string;
  value: string;
}

export interface CategoryOption {
  label: string;
  value: string;
}

export interface PaymentMethodOption {
  label: string;
  value: string;
}

export interface ForwardedEmailData {
  _id: string;
  sender?: {
    _id: string;
  };
  company?: string;
}

export interface AddExpenseFormProps {
  // Event handlers
  onSubmit: (data: ExpenseFormData) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;

  // Customization options
  customPaymentMethods?: PaymentMethodOption[];
  defaultCurrency?: string;

  // Styling
  className?: string;
  formClassName?: string;

  // Loading states
  isSubmitting?: boolean;

  // Validation
  customValidationSchema?: any;
}
