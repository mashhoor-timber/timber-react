import { CheckboxProps, Checkbox as NextCheckbox } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";

interface CustomCheckboxProps extends CheckboxProps {
  name: string;
}

export default function Checkbox({ name, ...props }: CustomCheckboxProps) {
  const { control } = useFormContext();
  const {
    field: { onChange, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <NextCheckbox
      {...field}
      classNames={{
        icon: "text-white",
        label: "text-sm whitespace-nowrap",
      }}
      isInvalid={!!error}
      isSelected={field.value}
      size="md"
      variant="bordered"
      onChange={(e) => {
        onChange(e.target.checked);
      }}
      {...props}
    />
  );
}
