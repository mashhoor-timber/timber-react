import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddChequeForm } from "../index";
import { FC } from "react";

const meta: Meta<typeof AddChequeForm> = {
  title: "Forms/AddChequeForm",
  component: AddChequeForm,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The AddChequeForm component is used to upload a cheque.",
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
          "This is the default state of the AddChequeForm. It includes all fields required to upload a cheque file.",
      },
    },
  },
};
