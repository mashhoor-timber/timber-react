import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TimberProvider, AddExpenseForm } from '../src';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof AddExpenseForm> = {
  title: 'Forms/AddExpenseForm',
  component: AddExpenseForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <TimberProvider config={{
          defaultCurrency: 'AED',
          features: {
            wafeqIntegration: true,
            zohoIntegration: true,
          }
        }}>
          <div className="max-w-4xl mx-auto p-4">
            <Story />
          </div>
        </TimberProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
const mockSelectedData = {
  _id: 'invoice-123',
  sender: {
    _id: 'sender-456',
  },
  company: 'company-789',
};

const mockCategories = [
  { key: 'software', label: 'Software', value: 'software' },
  { key: 'hardware', label: 'Hardware', value: 'hardware' },
];

// Mock API functions
const mockExpenseCategoryProvider = async (companyId?: string, search?: string) => {
  return {
    expense_categories: [
      { category: { label: 'Custom Category 1', value: 'custom_1' } },
      { category: { label: 'Custom Category 2', value: 'custom_2' } },
    ],
  };
};

const mockBankAccountProvider = async (senderId: string) => {
  return {
    data: {
      bank_accounts: [
        { id: 'bank-1', name: 'Main Bank Account', account: 'ACC001' },
        { id: 'bank-2', name: 'Savings Account', account: 'ACC002' },
      ],
    },
  };
};

const mockZohoAccountProvider = async (senderId: string) => {
  return {
    accounts: [
      { id: 'zoho-1', account_id: 'ZOHO001', account_name: 'Zoho Cash Account' },
      { id: 'zoho-2', account_id: 'ZOHO002', account_name: 'Zoho Bank Account' },
    ],
  };
};

const mockWafeqAccountProvider = async (senderId: string) => {
  return {
    accounts: [
      { id: 'wafeq-1', name_en: 'Wafeq Cash Account' },
      { id: 'wafeq-2', name_en: 'Wafeq Expense Account' },
    ],
  };
};

export const Default: Story = {
  args: {
    selectedData: mockSelectedData,
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      console.log('Expense added successfully!');
    },
    onError: (error) => {
      console.error('Error adding expense:', error);
    },
    expenseCategoryProvider: mockExpenseCategoryProvider,
    bankAccountProvider: mockBankAccountProvider,
    zohoAccountProvider: mockZohoAccountProvider,
    wafeqAccountProvider: mockWafeqAccountProvider,
  },
};

export const WithCustomCategories: Story = {
  args: {
    ...Default.args,
    customCategories: mockCategories,
  },
};

export const WithoutIntegrations: Story = {
  args: {
    ...Default.args,
    hideWafeqIntegration: true,
    hideZohoIntegration: true,
  },
};

export const CustomCurrency: Story = {
  args: {
    ...Default.args,
    defaultCurrency: 'USD',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isSubmitting: true,
  },
};