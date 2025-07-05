import type { Meta, StoryObj } from "@storybook/react-vite";
import  { AddPaymentForm } from "..";

const meta: Meta<typeof AddPaymentForm> = {
  title: "Forms/AddPaymentForm",
  component: AddPaymentForm,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive payment creation form for invoices and bills",
      },
    },
  },
  decorators: [(Story) => <Story />],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "The default AddPaymentForm form with all fields and functionality",
      },
    },
  },
};
