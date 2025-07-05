import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

import Button from '@components/atomic/Button';
import { parseDate } from '@internationalized/date';
import DatePicker from '@components/atomic/DatePicker';
import Form from '@components/atomic/Form';
import Input from '@components/atomic/Input';
import SelectInputWithSearch from '@components/atomic/SelectInputWithSearch';
import { formatCurrency } from '../../../utils/formatting';

import { addPaymentRecordSchema } from './schema';


import { useTimberClient } from 'providers/TimberProvider';
import { useEffect, useState } from 'react';
import ChequeDetails from './components/ChequeDetails';
// import WafeqWarning from './components/WafeqWarning';
import { AddPaymentFormProps, Invoice } from './types';
import BankDetails from './components/BankDetails';

const paidViaOptions = [
    { label: 'Bank', value: 'bank' },
    { label: 'Cheque', value: 'cheque' },
    { label: 'Payment Link', value: 'payment_link' },
    { label: 'Cash', value: 'cash' },
    { label: 'Card', value: 'card' },
];

const clientCreateMethodMap = {
  invoice: (client: ReturnType<typeof useTimberClient>) => client.invoicePayment.create,
  bill: (client: ReturnType<typeof useTimberClient>) => client.billPayment.create,
} as const;

const fetchMethodMap = {
  invoice: (client: ReturnType<typeof useTimberClient>, id: string) => client.invoice.get(id),
  bill: (client: ReturnType<typeof useTimberClient>, id: string) => client.vendorPayment.get(id),
} as const;

export const AddPaymentForm:React.FC <AddPaymentFormProps> = ({ invoiceID, type = 'invoice' }) => {
  const [invoice, setInvoice] = useState<Invoice | undefined>();
  const timberClient = useTimberClient();
  const createMethod = clientCreateMethodMap[type as 'invoice' | 'bill'](timberClient);

  useEffect(() => {
    const fetchInvoice = async () => {
      const response = await fetchMethodMap[type](timberClient, invoiceID);
      console.log(response?.data?.data,"invoice")
      setInvoice(response?.data?.data);
    };
    fetchInvoice();
  }, [invoiceID]);

  if (!invoice) {
    return null;
  }

  const defaultValues = {
    invoice: invoice._id,
    company: "",
    amount: invoice.amount_due - (invoice.postdated_payment ?? 0),
    payment_method: 'bank',
    date: parseDate(format(new Date(), 'yyyy-MM-dd')),
    cheque_no: '',
    cheque_date: parseDate(format(new Date(), 'yyyy-MM-dd')),
    cheque_due_date: parseDate(format(new Date(), 'yyyy-MM-dd')),
    file: [],
  };

  const handleSubmit = async (values: any) => {
    await timberClient.billPayment.create({
      ...values,
      date: values?.date?.toISOString(),
      file: values?.file ? values?.file[0] : null,
      cheque_due_date: values?.cheque_due_date?.toISOString(),
    });
  };

  return (
    <Form
      defaultValues={defaultValues}
      schema={addPaymentRecordSchema(invoice.amount_due)}
      onSubmit={handleSubmit}
       resetOnSubmit
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInputWithSearch
            isRequired
            label="Paid Via"
            name="payment_method"
            options={paidViaOptions}
            placeholder="Select payment method"
          />
          <BankDetails />
          <Input
            isRequired
            label="Amount"
             description={`Amount Due: ${formatCurrency(invoice.amount_due - invoice.postdated_payment!!, invoice.currency)}`}
            name="amount"
            type="number"
          />
          <DatePicker
            disableFutureDates
            isRequired
            showMonthAndYearPickers
            label="Payment Date"
            name="date"
          />
          <Input label="File" name="file" type="file" />
          <ChequeDetails />
          <Input label="invoice" name="invoice" type="hidden" />
          <Input label="company" name="company" type="hidden" />
        </div>
        {/* <WafeqWarning amount_due={invoice.amount_due} /> */}
      <div className="my-4 flex justify-end gap-2">
        <Button color="primary" type="submit">
          Record Payment
        </Button>
      </div>
    </Form>
  );
};

export default AddPaymentForm;
