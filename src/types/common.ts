export interface TimberBaseProps {
  className?: string;
  'data-testid'?: string;
}

export interface TimberFormProps extends TimberBaseProps {
  isSubmitting?: boolean;
  onSubmit: (data: any) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}