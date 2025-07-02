import { extendVariants, Select, type VariantProps } from "@heroui/react";

const SelectStyled: ReturnType<typeof extendVariants> = extendVariants(Select, {
  variants: {
    color: {
      white: {
        base: "group bg-background",
        trigger:
          "border bg-background data-[hover=true]:bg-background data-[hover=true]:border-default-400",
        value: "text-sm placeholder:text-sm placeholder:text-default-500",
        popoverContent: "bg-background",
        label: "text-sm mt-1 font-medium",
      },
      transparent: {
        innerWrapper: "w-auto",
        base: "group bg-background",
        trigger:
          "shadow-none border border-divider bg-transparent data-[hover=true]:bg-transparent group-hover:border-primary w-fit pe-8",
        label: "font-medium text-danger",
        listbox: "whitespace-nowrap",
      },
    },
  },
  defaultVariants: {
    color: "white",
    radius: "sm",
    size: "lg",
  },
});

export default SelectStyled;

export type SelectStyledProps = VariantProps<typeof SelectStyled>;
