import {
  extendVariants,
  Select,
  SelectProps,
  VariantProps,
} from "@heroui/react";
import { ComponentProps, ComponentType } from "react";

const SelectStyled = extendVariants(Select, {
  variants: {
    color: {
      default: {
        base: "group",
        trigger:
          "h-[42px] border border-divider bg-light group-hover:border-primary",
        label: "font-medium",
      },
    },
  },
  defaultVariants: {
    color: "default",
    radius: "md",
    size: "md",
  },
}) as ComponentType<SelectProps>;

export default SelectStyled;

export type SelectStyledProps = ComponentProps<typeof SelectStyled>;
