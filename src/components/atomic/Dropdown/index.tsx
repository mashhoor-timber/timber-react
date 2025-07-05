import {
  DropdownTrigger,
  extendVariants,
  Dropdown as NextDropdown,
  DropdownItem as NextDropdownItem,
  DropdownMenu as NextDropdownMenu,
  DropdownMenuProps as NextDropdownMenuProps,
  DropdownProps as NextDropdownProps,
  DropdownItemProps as NextDropdownItemProps,
} from "@heroui/react";
import { ComponentType } from "react";

const Dropdown = extendVariants(NextDropdown, {
  variants: {
    color: {
      default: {
        base: "p-0 rounded-2xl min-w-[150px]",
        content: 'p-0',
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
}) as ComponentType<NextDropdownProps>;

const DropdownMenu = extendVariants(NextDropdownMenu, {
  variants: {
    color: {
      default: {
        base: "p-0",
        list: "gap-0 *:rounded-none rounded-2xl *:px-4 *:py-3 *:border-b overflow-hidden",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
}) as ComponentType<NextDropdownMenuProps>;

const DropdownItem = extendVariants(NextDropdownItem, {
  variants: {
    color: {
      default: {
        base: "p-4 rounded-none border-b border-divider",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
}) as ComponentType<NextDropdownItemProps>;

export default Dropdown;

export { DropdownItem, DropdownMenu, DropdownTrigger };
