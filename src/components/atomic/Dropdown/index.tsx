import React from "react";
import {
  DropdownTrigger,
  extendVariants,
  Dropdown as NextDropdown,
  DropdownItem as NextDropdownItem,
  DropdownMenu as NextDropdownMenu,
} from "@heroui/react";

const Dropdown: React.ComponentType<any> = extendVariants(NextDropdown, {
  variants: {
    color: {
      default: {
        content: "p-0 rounded-2xl min-w-[150px]",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});

const DropdownMenu: React.ComponentType<any> = extendVariants(
  NextDropdownMenu,
  {
    variants: {
      color: {
        default: {
          base: "p-0",
          list: "gap-0 *:rounded-none rounded-2xl pt-3 overflow-hidden",
        },
        text: {
          base: "p-0",
          list: "gap-0 *:rounded-none rounded-2xl *:px-4 *:py-3 *:border-b overflow-hidden",
        },
      },
    },
    defaultVariants: {
      color: "text",
    },
  }
);

const DropdownItem: React.ComponentType<any> = extendVariants(
  NextDropdownItem,
  {
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
  }
);

export default Dropdown;

export { DropdownItem, DropdownMenu, DropdownTrigger };
