import { InputProps, Input as NextInput } from "@heroui/react";
import { Spinner } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";
interface CustomInputProps extends InputProps {
  name: string;
  textEnd?: boolean;
  isLoading?: boolean;
}

function Input({ name, textEnd, isLoading, ...props }: CustomInputProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type === "file") {
      onChange(e.target.files);
    } else {
      onChange(e.target.value);
    }
  };

  const endContent = isLoading ? <Spinner size="sm" /> : props.endContent;

  return (
    <NextInput
      {...field}
      classNames={{
        inputWrapper: `h-[42px] border border-divider ${
          props.disabled ? "bg-default-100" : ""
        }`,
        label: "font-medium",
        input: textEnd ? "text-end" : "",
      }}
      endContent={endContent}
      errorMessage={error?.message}
      isInvalid={!!error}
      labelPlacement="outside"
      radius="md"
      size="md"
      validationBehavior="aria"
      value={props.type === "file" ? undefined : value}
      variant="bordered"
      onBlur={onBlur}
      onChange={handleChange}
      {...props}
    />
  );
}

export default Input;
