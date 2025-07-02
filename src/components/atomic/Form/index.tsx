import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

type FormType = UseFormProps & {
  children: ReactNode | ((methods: UseFormReturn) => ReactNode);
  schema: any;
  onSubmit: (data: any) => any;
  resetOnSubmit?: boolean;
  showErrorToast?: boolean;
  className?: string;
};

export default function Form({
  children,
  defaultValues,
  schema,
  onSubmit,
  resetOnSubmit = false,
  showErrorToast = false,
  className = "",
}: FormType) {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
    // reValidateMode: 'on',
    shouldFocusError: true,
    criteriaMode: "firstError",
    shouldUseNativeValidation: false,
  });

  const { handleSubmit, reset, getValues } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form
          noValidate
          className={`w-full ${className}`}
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data);
            if (resetOnSubmit) methods.reset();
            else reset(getValues());
          })}
        >
          {typeof children === "function" ? children(methods) : children}
        </form>
      </FormProvider>
    </>
  );
}
