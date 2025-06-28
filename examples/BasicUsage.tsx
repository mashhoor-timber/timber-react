import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TimberProvider, AddExpenseForm } from '@timber/ui';

const queryClient = new QueryClient();

export function BasicUsageExample() {
  const selectedData = {
    _id: 'invoice-123',
    sender: { _id: 'sender-456' },
    company: 'company-789',
  };

  const handleSubmit = async (formData) => {
    try {
      // Your API call here
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to add expense');
      
      const result = await response.json();
      console.log('Expense added:', result);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TimberProvider config={{ defaultCurrency: 'AED' }}>
        <AddExpenseForm
          selectedData={selectedData}
          onSubmit={handleSubmit}
          onSuccess={() => alert('Expense added successfully!')}
          onError={(error) => alert(`Error: ${error.message}`)}
        />
      </TimberProvider>
    </QueryClientProvider>
  );
}
