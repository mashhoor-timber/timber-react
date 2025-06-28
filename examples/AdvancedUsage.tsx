import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TimberProvider, AddExpenseForm } from '@timber/ui';

const queryClient = new QueryClient();

export function AdvancedUsageExample() {
  const selectedData = {
    _id: 'invoice-123',
    sender: { _id: 'sender-456' },
    company: 'company-789',
  };

  // Custom API providers
  const expenseCategoryProvider = async (companyId, search) => {
    const response = await fetch(`/api/companies/${companyId}/expense-categories?search=${search}`);
    return response.json();
  };

  const bankAccountProvider = async (senderId) => {
    const response = await fetch(`/api/senders/${senderId}/bank-accounts`);
    return response.json();
  };

  const zohoAccountProvider = async (senderId) => {
    const response = await fetch(`/api/senders/${senderId}/zoho-accounts`);
    return response.json();
  };

  const wafeqAccountProvider = async (senderId) => {
    const response = await fetch(`/api/senders/${senderId}/wafeq-accounts`);
    return response.json();
  };

  const handleSubmit = async (formData) => {
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add expense');
    }
    
    return response.json();
  };

  const customCategories = [
    { key: 'custom1', label: 'Custom Category 1', value: 'custom1' },
    { key: 'custom2', label: 'Custom Category 2', value: 'custom2' },
  ];

  const customPaymentMethods = [
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Debit Card', value: 'debit_card' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
    { label: 'Cash', value: 'cash' },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <TimberProvider 
        config={{ 
          defaultCurrency: 'USD',
          features: {
            wafeqIntegration: true,
            zohoIntegration: false, // Disable Zoho integration
          }
        }}
      >
        <AddExpenseForm
          selectedData={selectedData}
          onSubmit={handleSubmit}
          onSuccess={() => {
            // Redirect to expense list or show success toast
            window.location.href = '/expenses';
          }}
          onError={(error) => {
            // Show error toast or modal
            console.error('Form submission error:', error);
          }}
          
          // Custom data providers
          expenseCategoryProvider={expenseCategoryProvider}
          bankAccountProvider={bankAccountProvider}
          wafeqAccountProvider={wafeqAccountProvider}
          
          // Custom options
          customCategories={customCategories}
          customPaymentMethods={customPaymentMethods}
          
          // UI customization
          hideZohoIntegration={true}
          defaultCurrency="USD"
          className="shadow-lg"
          formClassName="bg-gray-50"
        />
      </TimberProvider>
    </QueryClientProvider>
  );
}
