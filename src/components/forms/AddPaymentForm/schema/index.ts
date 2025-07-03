import * as Yup from 'yup';

export const addPaymentRecordSchema = (max: number) =>
    Yup.object().shape({
        invoice: Yup.string().trim().required('Invoice is required'),
        payment_method: Yup.string()
            .oneOf(['bank', 'card', 'cheque', 'payment_link', 'cash'], 'Invalid payment method')
            .required(),
        amount: Yup.number()
            .min(1, 'Amount must be at least 1')
            .max(max, 'Amount exceeds the due amount')
            .required('Amount is required'),
        date: Yup.date().required('Date is required'),
        cheque_no: Yup.string().when('payment_method', {
            is: 'cheque',
            then: schema => schema.required('Cheque number is required'),
            otherwise: schema => schema.optional(),
        }),
        cheque_date: Yup.date().when('payment_method', {
            is: 'cheque',
            then: schema => schema.required('Cheque date is required'),
            otherwise: schema => schema.optional(),
        }),
        cheque_due_date: Yup.date().when('payment_method', {
            is: 'cheque',
            then: schema =>
                schema
                    .required('Cheque due date is required')
                    .min(Yup.ref('cheque_date'), "Due date can't be before cheque date"),
            otherwise: schema => schema.optional(),
        }),
        bank_name: Yup.string().when('payment_method', {
            is: 'bank',
            then: schema => schema.required('Bank name is required'),
            otherwise: schema => schema.optional(),
        }),
    });