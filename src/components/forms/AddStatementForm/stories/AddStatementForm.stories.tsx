import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddStatementForm } from "../index";
import { FC } from "react";

const meta: Meta<typeof AddStatementForm> = {
  title: "Forms/AddStatementForm",
  component: AddStatementForm,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The AddStatementForm component is used to upload a new bank statement.",
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
          "This is the default state of the AddStatementForm. It includes all fields required to upload a statement file.",
      },
    },
  },
};
