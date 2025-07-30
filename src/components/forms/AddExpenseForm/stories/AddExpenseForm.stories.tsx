import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddExpenseForm } from "../index";
import { FC } from "react";

const meta: Meta<typeof AddExpenseForm> = {
  title: "Forms/AddExpenseForm",
  component: AddExpenseForm,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The AddExpenseForm component is used to create a new expense. It includes fields for the expense amount, date, category, and description. The form also supports file uploads for receipts and allows users to select a project associated with the expense.",
      },
    },
  },
  decorators: [(Story: FC) => <Story />],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "This is the default state of the AddExpenseForm. It includes all fields required to create a new expense, such as amount, date, category, description, and project selection. The form is ready for user input.",
      },
    },
  },
};