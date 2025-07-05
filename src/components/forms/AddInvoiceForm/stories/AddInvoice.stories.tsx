import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddInvoice } from "..";
import { toast } from "sonner";
import { FC } from "react";
import { Invoice } from "../types";

const meta: Meta<typeof AddInvoice> = {
  title: "Forms/AddInvoice",
  component: AddInvoice,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive invoice creation form with customer details, line items, and calculations.",
      },
    },
  },
  decorators: [(Story: FC) => <Story />],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSuccess: (values: Invoice) => {
      console.log("Invoice created successfully:", values);
      toast.success("Invoice created successfully!");
    },
  },
  parameters: {
    docs: {
      description: {
        story: "The default AddInvoice form with all fields and functionality.",
      },
    },
  },
};
