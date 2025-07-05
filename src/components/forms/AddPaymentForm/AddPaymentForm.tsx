import { format } from 'date-fns';

import Button from '@components/atomic/Button';
import { parseDate } from '@internationalized/date';
import DatePicker from '@components/atomic/DatePicker';
import Form from '@components/atomic/Form';
import Input from '@components/atomic/Input';
import SelectInputWithSearch from '@components/atomic/SelectInputWithSearch';
import { formatCurrency } from '../../../utils/formatting';

import { addPaymentRecordSchema } from './schema';


import { useTimberClient } from '@providers/TimberProvider';
import ChequeDetails from './components/ChequeDetails';
// import WafeqWarning from './components/WafeqWarning';
import { AddPaymentFormProps } from './types';
import { useQuery } from "@tanstack/react-query";
import BankDetails from './components/BankDetails';

import { Spinner } from '@heroui/react';
import { toast } from 'sonner';

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
  const timberClient = useTimberClient();
  const {data:invoice,isLoading,isError} = useQuery({
    queryKey:['invoice',invoiceID,type],
    queryFn:()=>fetchMethodMap[type](timberClient,invoiceID),
    select:(res:any)=>res.data.data,
    enabled:!!invoiceID
  });
  const createMethod = clientCreateMethodMap[type];
if (!createMethod) {
  throw new Error(`Invalid payment type: ${type}`);
}
const method = createMethod(timberClient).bind(
  type === 'invoice' ? timberClient.invoicePayment : timberClient.billPayment
);

  // useEffect(() => {
  //   const fetchInvoice = async () => {
  //     const response = await fetchMethodMap[type](timberClient, invoiceID);
  //     setInvoice(response?.data?.data);
  //   };
  //   fetchInvoice();
  // }, [invoiceID,type]);
  if(isLoading){
    return <div className='min-h-[80vh] flex justify-center items-center'>
      <Spinner size='lg' />
    </div>
  }

if (isError || !invoice) {
  toast.error('Error fetching invoice');
  return (
    <div className="text-center mt-4">
      Failed to load invoice/bill data make sure id is correct.
    </div>
  );
}


  const defaultValues = {
    invoice: invoice._id,
    company: "",
    amount: invoice.amount_due - (invoice.postdated_payment ?? 0),
    payment_method: 'bank',
    date: parseDate(format(new Date(), 'yyyy-MM-dd')),
    cheque_no: '',
    // cheque_date: parseDate(format(new Date(), 'yyyy-MM-dd')),
    // cheque_due_date: parseDate(format(new Date(), 'yyyy-MM-dd')),
  };

  const handleSubmit = async (values: any) => {
    await method({
      ...values,
      invoice:invoice?._id,
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
