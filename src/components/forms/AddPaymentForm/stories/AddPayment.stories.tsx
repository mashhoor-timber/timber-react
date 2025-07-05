import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddPaymentForm } from "..";

const meta: Meta<typeof AddPaymentForm> = {
  title: "Forms/AddPaymentForm",
  component: AddPaymentForm,
  argTypes: {
    invoiceID: { control: "text" },
    type: { control: "radio", options: ["invoice", "bill"] },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive payment creation form used to record payments against invoices or bills.",
      },
    },
  },
  decorators: [(Story) => <Story />],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "invoice",
    invoiceID: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story renders the AddPaymentForm with default type set to 'invoice'. Use controls to toggle between invoice and bill modes.",
      },
    },
  },
};
