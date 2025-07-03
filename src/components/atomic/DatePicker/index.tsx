import {
  DatePickerProps,
  Image,
  DatePicker as NextDatePicker,
} from "@heroui/react";
import {
  CalendarDate,
  CalendarDateTime,
  DateValue,
  ZonedDateTime,
} from "@internationalized/date";
import { useController, useFormContext } from "react-hook-form";
import CalendarIcon from "../../../assets/icons/CalendarIcon";

// Define a more specific type for the DatePicker props
type DatePickerValue = ZonedDateTime | CalendarDate | CalendarDateTime | null;

interface CustomDatePickerProps
  extends Omit<DatePickerProps, "onChange" | "validate"> {
  name?: string;
  disableFutureDates?: boolean;
  disabledDates?: Date[];
  disablePastDates?: boolean;
  onChange?: (value: DatePickerValue) => void;
  validate?: any;
}

const dateValueToDate = (dateValue: DateValue): Date =>
  new Date(dateValue.year, dateValue.month - 1, dateValue.day);

function stripTime(date: Date): Date {
  const strippedDate = new Date(date);
  strippedDate.setHours(0, 0, 0, 0);
  return strippedDate;
}

const isDateUnavailable = (
  date: DateValue,
  disableFutureDates?: boolean,
  disabledDates?: Date[],
  disablePastDates?: boolean
) => {
  const dateObj = dateValueToDate(date);
  const strippedDate = stripTime(dateObj);

  if (disableFutureDates && strippedDate > stripTime(new Date())) return true;
  if (disablePastDates && strippedDate < stripTime(new Date())) return true;
  if (
    disabledDates?.some(
      (disabledDate) =>
        stripTime(disabledDate).toDateString() === strippedDate.toDateString()
    )
  ) {
    return true;
  }

  return false;
};

function DatePicker({
  name,
  disableFutureDates,
  disabledDates,
  disablePastDates,
  ...props
}: CustomDatePickerProps) {
  name ||= "";
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  if (!name) return null;
  return (
    <NextDatePicker
      {...field}
      hideTimeZone
      showMonthAndYearPickers
      calendarProps={{}}
      classNames={{
        base: "gap-1",
        inputWrapper: `h-[42px] border border-divider px-4 mt-0 pt-0`,
        label: "font-medium",
      }}
      errorMessage={error?.message as string}
      isDateUnavailable={(date) =>
        isDateUnavailable(
          date,
          disableFutureDates,
          disabledDates,
          disablePastDates
        )
      }
      isInvalid={!!error}
      labelPlacement="outside"
      radius="md"
      selectorIcon={
        <CalendarIcon width={16} height={16} className="text-gray-400" />
      }
      size="md"
      timeInputProps={{}}
      validationBehavior="aria"
      variant="bordered"
      onChange={(val) => {
        field.onChange(val);
      }}
      {...props}
    />
  ) as any;
}

export default DatePicker;
