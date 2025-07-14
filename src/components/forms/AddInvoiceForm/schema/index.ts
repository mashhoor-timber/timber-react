import { CalendarDate } from '@internationalized/date';
import { startOfDay } from 'date-fns';
import * as Yup from 'yup';

export const invoiceSchema = Yup.object().shape({
    company: Yup.string().trim().required('Company is required'),
    title: Yup.string().trim().required('Title is required'),
    customer: Yup.object().shape({
        customer_id: Yup.string().trim().optional(),
        name: Yup.string().trim().required('Customer name is required'),
        // country: Yup.string().trim().required('Customer country is required'),
        // city: Yup.string().trim().required('Customer city is required'),
        email: Yup.string().trim().email('Invalid email format').required('Email is required'),
        country_code: Yup.string().trim().required('Customer country code is required'),
        mobile: Yup.string().trim().required('Mobile is required'),
        address: Yup.string().required('Customer address is required'),
        trn: Yup.string()
            .trim()
            .nullable()
            .test('is-empty-or-15-alphanumeric', 'TRN must be exactly 15 characters', value => {
                if (!value) return true;
                return /^[a-zA-Z0-9]{15}$/.test(value);
            }),
    }),
    biller: Yup.object().shape({
        biller_id: Yup.string().trim().optional(),
        name: Yup.string().trim().required('Biller name is required'),
        // country: Yup.string().trim().required('Biller country is required'),
        // city: Yup.string().trim().required('Biller city is required'),
        email: Yup.string().trim().email('Invalid email format').required('Email is required'),
        country_code: Yup.string().trim().required('Biller country code is required'),
        mobile: Yup.string().trim().required('Mobile is required'),
        address: Yup.string().required('Biller address is required'),
        trn: Yup.string()
            .trim()
            .nullable()
            .test('is-empty-or-15-alphanumeric', 'TRN must be exactly 15 characters', value => {
                if (!value) return true;
                return /^[a-zA-Z0-9]{15}$/.test(value);
            }),
    }),
    invoice_number: Yup.string().trim().required('Invoice number is required'),
    // order_number: Yup.string().trim().required('Order number is required'),
    invoice_date: Yup.mixed<CalendarDate>()
        .transform(value => (value ? startOfDay(new Date(value)) : value))
        .required(),
    due_date: Yup.date()
        .transform(value => (value ? startOfDay(new Date(value)) : value))
        .required('Due date is required')
        .min(Yup.ref('invoice_date'), "Due date can't be before invoice date"),
    items: Yup.array()
        .required('Items are required')
        .min(1, 'Items are required')
        .of(
            Yup.object().shape({
                id: Yup.string().trim().required(),
                title: Yup.string().trim().required('Title is required'),
                quantity: Yup.number().required('Quantity is required'),
                rate: Yup.number().required('Price is required'),
                vat: Yup.number().min(0, 'VAT must be at least 0').required('VAT is required'),
                discount: Yup.number().min(0, 'Discount must be at least 0').required(),
                total: Yup.number().min(0, 'Total must be at least 0').required(),
            })
        ),
    terms: Yup.string().trim().optional(),
    notes: Yup.string().trim().optional(),
    sub_total: Yup.number().required('Subtotal amount is required'),
    vat_total: Yup.number().required('VAT amount is required'),
    discount_total: Yup.number().required('Discount amount is required'),
    shipping: Yup.number().min(0, 'Discount must be at least 0').required(),
    total: Yup.number().required('Total amount is required'),
    amount_paid: Yup.number()
        .max(Yup.ref('total'), "Amount paid can't be more than total amount")
        .required(),
    amount_due: Yup.number().required(),
    payment_method: Yup.string().required(),
    isTitleChanged: Yup.boolean().required(),
    currency: Yup.string().required(),
    wafeq: Yup.boolean().required(),
    zoho: Yup.boolean().required(),
    logo: Yup.mixed<string | File>().defined().nullable(),
    place_of_supply: Yup.string()
        .nullable()
        .when('customer', {
            is: (customer: { trn: any }) => customer?.trn,
            then: schema =>
                schema.required('Place of Supply is required when customer TRN is present'),
            otherwise: schema => schema.nullable(),
        }),
});

export const invoiceNumberSchema = Yup.object().shape({
    enabled: Yup.boolean().optional(),
    next_number: Yup.number().required('Next number is required'),
    sequence_length: Yup.number().required('Sequence length is required'),
    prefix: Yup.string().trim().optional(),
});

export const invoiceTemplateSchema = Yup.object().shape({
    company: Yup.string().trim().required('Company is required'),
    name: Yup.string().trim().required('Name is required'),
    content: Yup.string().trim().required('Content is required'),
});
