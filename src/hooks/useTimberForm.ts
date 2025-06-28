import { useState } from "react";

export interface UseTimberFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  validateOnChange?: boolean;
}

export function useTimberForm<T>({
  initialValues,
  onSubmit,
  onSuccess,
  onError,
  validateOnChange = false,
}: UseTimberFormOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleSubmit = async (formValues: T) => {
    setIsSubmitting(true);
    try {
      await onSubmit(formValues);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (validateOnChange) {
      // Clear error for this field
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    resetForm,
    setErrors,
  };
}
