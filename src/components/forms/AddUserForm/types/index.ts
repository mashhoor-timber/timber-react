export type UserFormData = {
  name: string;
  email: string;
  mobile: string;
  country_code: string;
  country: string;
  city: string;
  address: string;
  trn?: string;
  role: "customer" | "vendor" | "biller";
  logo?: File | null;
};

export type AddUserFormProps = {
  onSubmit: (data: UserFormData) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
