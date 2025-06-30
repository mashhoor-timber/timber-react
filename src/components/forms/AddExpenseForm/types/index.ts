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

export interface AccountOption {
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

  // Data providers (optional - for custom implementations)
  expenseCategoryProvider?: (
    companyId?: string,
    search?: string
  ) => Promise<any>;
  expenseSubCategoryProvider?: (category: string) => Promise<any>;
  bankAccountProvider?: (senderId: string) => Promise<any>;
  zohoAccountProvider?: (senderId: string) => Promise<any>;
  wafeqAccountProvider?: (senderId: string) => Promise<any>;

  // Customization options
  customPaymentMethods?: AccountOption[];
  customCurrencyOptions?: CurrencyOption[];
  hideWafeqIntegration?: boolean;
  hideZohoIntegration?: boolean;
  defaultCurrency?: string;

  // Styling
  className?: string;
  formClassName?: string;

  // Loading states
  isSubmitting?: boolean;

  // Validation
  customValidationSchema?: any;
}
