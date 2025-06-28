import { SelectOption } from "./common";

export interface BaseFormData {
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'date' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  validation?: any;
}