import {
  extendVariants,
  Select,
  SelectProps,
  VariantProps,
} from "@heroui/react";

const SelectStyled = extendVariants(Select, {
  variants: {
    color: {
      white: {
        base: "group",
        trigger:
          "h-[42px] border border-divider bg-light group-hover:border-primary",
        label: "font-medium",
      },
      transparent: {
        innerWrapper: "w-auto",
        base: "group",
        trigger:
          "h-[40px] shadow-none border border-divider bg-transparent group-hover:border-primary w-fit pe-8",
        label: "font-medium text-danger",
        listbox: "whitespace-nowrap",
      },
    },
  },
  defaultVariants: {
    color: "white",
    radius: "md",
    size: "md",
  },
});

export default SelectStyled

export type SelectStyledProps = VariantProps<typeof SelectStyled>;
