import { Accept } from "react-dropzone/.";

export type ChequeFormData = {
  file: File;
};

export interface AddChequeFormProps {
  name?: string;
  multiple?: boolean;
  maxFiles?: number;
  accept?: Accept;
  maxSize?: number;
  disabled?: boolean;
  title: string;
  width?: number;
  height?: number;
  // Event handlers
  onSubmit: (data: ChequeFormData) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
