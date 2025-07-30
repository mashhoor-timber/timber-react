import { Textarea as NextTextarea, TextAreaProps } from "@heroui/input";
import { useController, useFormContext } from "react-hook-form";

interface CustomTextareaProps extends TextAreaProps {
  name: string;
}

export default function Textarea({ name, ...props }: CustomTextareaProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <NextTextarea
      {...field}
      classNames={{
        inputWrapper: `h-[60px] border border-divider`,
        label: "font-medium text-sm",
      }}
      errorMessage={error?.message as string}
      isInvalid={!!error}
      labelPlacement="outside"
      radius="sm"
      size="lg"
      variant="bordered"
      {...props}
    />
  );
}
