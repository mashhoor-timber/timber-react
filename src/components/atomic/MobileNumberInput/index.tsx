import { InputProps, Input as NextInput } from "@heroui/input";
import { useController, useFormContext } from "react-hook-form";
import { usePhoneInput } from "react-international-phone";
import CountryPicker from "./components/CountryPicker";

interface CustomInputProps extends InputProps {
  nameMobile: string;
  nameCode: string;
}

export default function MobileNumberInput({
  nameMobile,
  nameCode,
  ...props
}: CustomInputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: nameMobile,
    control,
  });

  const {
    field: fieldCode,
    fieldState: { error: errorCode },
  } = useController({
    name: nameCode,
    control,
  });

  const { inputValue: defaultNumber, country: defCountry } = usePhoneInput({
    value: `${fieldCode.value}${field.value}`,
  });

  // const defaultCountry = defaultCountries.find(country => `+${country[2]}` === fieldCode.value);
  const { handlePhoneValueChange, country, inputValue, setCountry } =
    usePhoneInput({
      defaultCountry: defCountry.iso2,
      forceDialCode: false,
      disableDialCodePrefill: true,
      onChange: (value) => {
        const countryCode = `+${value.country.dialCode}`;
        const mobile = value.phone.replace(countryCode, "");
        field.onChange(mobile);
        fieldCode.onChange(countryCode);
      },
    });

  return (
    <NextInput
      classNames={{
        inputWrapper: `h-[42px] shadow-sm border border-divider`,
        label: "font-medium text-sm",
        
      }}
      defaultValue={defaultNumber}
      errorMessage={error?.message || errorCode?.message}
      isInvalid={!!error}
      labelPlacement="outside"
      radius="sm"
      size="lg"
      startContent={<CountryPicker country={country} setCountry={setCountry} />}
      validationBehavior="aria"
      value={inputValue || defaultNumber}
      variant="bordered"
      {...props}
      onChange={handlePhoneValueChange}
    />
  );
}
