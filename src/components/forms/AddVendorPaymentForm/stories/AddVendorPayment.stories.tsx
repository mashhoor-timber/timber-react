import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddVendorInvoice } from "..";
import { toast } from "sonner";
import { FC } from "react";

const meta: Meta<typeof AddVendorInvoice> = {
  title: "Forms/AddVendorPayment",
  component: AddVendorInvoice,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive vendor payment creation form with vendor details, line items, and calculations.",
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
    onSuccess: (values: any) => {
      console.log("Vendor Payment created successfully:", values);
      toast.success("Vendor Payment created successfully!");
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
