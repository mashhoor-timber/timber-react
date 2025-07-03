import { SelectItem, SharedSelection } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";

import SelectStyled, { SelectStyledProps } from "./SelectStyled";

interface CustomSelectProps extends SelectStyledProps {
  name?: string;
  className?: string;
  title?: string;
}

function RHFSelect({ name, className, ...props }: CustomSelectProps) {
  const { control } = useFormContext();

  const {
    field: { value, onChange, onBlur, ...field },
    fieldState: { error },
  } = useController({
    name: name as string,
    control,
  });

  const handleChange = (keys: SharedSelection) => {
    if (props.selectionMode === "multiple") onChange(Array.from(keys));
    else onChange(Array.from(keys)[0]);
  };

  return (
    <SelectStyled
      {...field}
      className={className}
      errorMessage={error?.message}
      isInvalid={!!error}
      labelPlacement="outside"
      selectedKeys={new Set(Array.isArray(value) ? value : [value])}
      validationBehavior="aria"
      onSelectionChange={handleChange}
      {...props}
    >
      {props.children}
    </SelectStyled>
  );
}

export default function Select({
  name,
  className,
  title,
  ...props
}: CustomSelectProps) {
  if (name) return <RHFSelect name={name} {...props} />;
  return (
    <SelectStyled
      {...props}
      className={className}
      renderValue={(value: any) => (
        <span className="font-semibold text-sm">{value[0].rendered}</span>
      )}
      startContent={
        <span
          className={`${
            !title && "hidden"
          } text-sm text-[#515151] whitespace-nowrap`}
        >{`${title}:`}</span>
      }
    >
      {props.children}
    </SelectStyled>
  );
}

export { SelectItem };
