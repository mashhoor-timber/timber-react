import { Accept } from "react-dropzone/.";

export type StatementFormData = {
  file: File;
};

export interface AddStatementFormProps {
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
  onSubmit: (data: StatementFormData) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
