# timber-react Usage Examples

## Installation

\`\`\`bash
npm install timber-react

# or

yarn add timber-react
\`\`\`

## Peer Dependencies

Make sure you have these installed:

\`\`\`bash
npm install react react-dom @heroui/react @tanstack/react-query formik date-fns
\`\`\`

## Basic Usage

\`\`\`tsx
import { TimberProvider, AddExpenseForm } from 'timber-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
return (
<QueryClientProvider client={queryClient}>
<TimberProvider config={{ defaultCurrency: 'AED' }}>
<AddExpenseForm
selectedData={invoiceData}
onSubmit={handleSubmit}
onSuccess={() => console.log('Success!')}
/>
</TimberProvider>
</QueryClientProvider>
);
}
\`\`\`

## Advanced Configuration

### Custom Data Providers

You can provide custom functions for fetching data:

\`\`\`tsx
<AddExpenseForm
selectedData={data}
onSubmit={handleSubmit}
expenseCategoryProvider={async (companyId, search) => {
// Your custom API call
return await fetchExpenseCategories(companyId, search);
}}
bankAccountProvider={async (senderId) => {
// Your custom API call
return await fetchBankAccounts(senderId);
}}
/>
\`\`\`

### UI Customization

\`\`\`tsx
<AddExpenseForm
selectedData={data}
onSubmit={handleSubmit}
hideWafeqIntegration={true}
hideZohoIntegration={true}
defaultCurrency="USD"
className="custom-form-wrapper"
customCategories={[
{ key: 'travel', label: 'Travel Expenses', value: 'travel' }
]}
/>
\`\`\`

## TypeScript Support

The library is fully typed. Import types for better development experience:

\`\`\`tsx
import {
AddExpenseFormProps,
ExpenseFormData,
TimberConfig
} from 'timber-react';
\`\`\`

## Styling

The components use HeroUI and are compatible with Tailwind CSS. You can customize styles using:

1. The \`className\` prop for wrapper styles
2. The \`formClassName\` prop for form container styles
3. Custom CSS/Tailwind classes
4. Theme configuration through \`TimberProvider\`
   `;
