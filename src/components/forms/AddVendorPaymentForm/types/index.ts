import { CancelTokenSource } from 'axios';

export type InvoiceItem = {
    _id?: string;
    title: string;
    quantity: number;
    rate: number | string;
    vat: number;
    discount: number;
    total: number;
};

export type NewInvoiceItem = {
    id: string;
    title: string;
    quantity: number;
    rate: number;
    vat: number;
    discount: number;
    total: number;
};

export type CreateInvoiceValues = {
    mode: 'create' | 'edit';
    payment_method: string;
    title: string;
    company: string;
    isTitleChanged: boolean;
    customer: {
        customer_id?: string;
        name: string;
        email: string;
        trn?: string;
        country_code: string;
        mobile: string;
        address: string;
    };
    biller: {
        biller_id?: string;
        name: string;
        email: string;
        country_code: string;
        mobile: string;
        address: string;
        trn?: string;
    };
    invoice_number: string;
    invoice_date: any;
    due_date: any | null;
    currency: string;
    items: NewInvoiceItem[];
    terms: any;
    notes: any;
    sub_total: number;
    vat_total: number;
    discount_total: number;
    shipping: number;
    total: number;
    amount_paid: number;
    amount_due: number;
    logo: string | null | File;
    place_of_supply?: string;
    status:'paid'   | 'unpaid';
    wafeq: boolean;
    zoho: boolean;
};

export type CreateInvoiceRequest = {
    // payment_method: string;
    title: string;
    customer: {
        name: string;
        // country: string;
        // city: string;
        email: string;
        trn?: string;
        country_code: string;
        mobile: string;
        address: string;
    };
    biller: {
        name: string;
        // country: string;
        // city: string;
        email: string;
        country_code: string;
        mobile: string;
        address: string;
        trn?: string;
    };
    invoice_number: string;
    // order_number: string;
    invoice_date: any;
    due_date: any;
    currency: string;
    items: InvoiceItem[];
    terms: string;
    notes: string;
    sub_total: number;
    vat_total: number;
    discount_total: number;
    shipping: number;
    total: number;
    amount_paid: number;
    amount_due: number;
    logo: File | null | string;
};

export type MonthlyInvoiceChartResponse = {
    invoices: { month: number; year: number; total: number }[];
};

export type CustomersChartResponse = {
    frequent_customer: string;
    customers: { name: string; count: number }[];
};

export type Invoice = {
    _id: string;
    company: any;
    payment_method: string;
    title: string;
    user: {
        _id: string;
        name: string;
        email: string;
        image: string;
        wafeq_key?: string;
        zoho_org_id?: string;
    };
    customer: {
        customer_id: string;
        name: string;
        email: string;
        country_code: string;
        mobile: string;
        address: string;
        trn?: string;
    };
    biller: {
        biller_id: string;
        name: string;
        country: string;
        city: string;
        email: string;
        country_code: string;
        mobile: string;
        address: string;
        trn?: string;
    };
    invoice_number: string;
    order_number: string;
    invoice_date: string;
    due_date: string;
    currency: string;
    items: InvoiceItem[];
    terms: string;
    notes: string;
    sub_total: number;
    vat_total: number;
    discount_total: number;
    shipping: number;
    total: number;
    amount_paid: number;
    amount_due: number;
    status: string;
    created_at: string;
    wafeq_invoice_id: string;
    zoho_invoice_id: string;
    file: string;
    wafeq: boolean;
    zoho: boolean;
    logo: string;
    is_deleted: boolean;
    place_of_supply?: string;
    remarks?: string;
    postdated_payment?: number;
};

export type AllInvoiceResponse = {
    invoices: Invoice[];
    total: number;
};

export type InvoiceCustomer = {
    _id: string;
    company: string;
    name: string;
    email: string;
    mobile: string;
    country_code: string;
    country: string;
    city: string;
    address: string;
    trn: string;
    role: 'biller' | 'customer';
    logo: string;
    created_at: string;
};

export type InvoiceCustomerPayload = {
    company: string;
    name: string;
    email: string;
    mobile: string;
    country_code: string;
    country: string;
    city: string;
    role: 'biller' | 'customer' | 'vendor';
    logo?: any;
    address: string;
    trn?: string;
};

export type UpdateInvoiceCustomerPayload = {
    company: string;
    id: string;
    name?: string;
    email?: string;
    mobile?: string;
    country_code?: string;
    country?: string;
    city?: string;
    role?: 'biller' | 'customer';
    logo?: any;
    image_deleted: boolean;
    address?: string;
    trn?: string;
};

export type InvoiceCustomerResponse = {
    invoice_customers: InvoiceCustomer[];
    total: number;
};

export type SuggestedCustomerResponse = {
    suggested_customers: InvoiceCustomer[];
};

export type OCRInvoiceResponse = {
    payment_method: string;
    merchant_name: string;
    phone_number: string;
    address: string;
    merchant_email: string;
    merchant_phone: string;
    merchant_address: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    invoice_number: string;
    issued_date: string;
    invoice_due_date: string;
    item_name: string[];
    item_qty: string[];
    item_value: string[];
    item_tax: string[];
    item_discount: string[];
    item_total: string[];
    description: string;
    notes: string;
    terms: string;
    subtotal: number;
    vat: number;
    discount: number;
    shipping: string;
    amount_paid: string;
    amount_due: number;
    logo: File | null;
    [key: string]: any;
};

export type OcrInvoiceProps = {
    file: File;
    progressCallback: (progress: number) => void;
    cancelToken?: CancelTokenSource;
};

export type OCRInvoice = {
    payment_method: string;
    merchant_name: string;
    phone_number: string;
    address: string;
    merchant_email: string;
    merchant_phone: string;
    merchant_address: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    invoice_number: string;
    issued_date: string;
    invoice_due_date: string;
    item_name: string[];
    item_qty: string[];
    item_value: string[];
    item_tax: string[];
    item_discount: string[];
    item_total: string[];
    description: string;
    notes: string;
    terms: string;
    subtotal: number;
    vat: number;
    discount: number;
    shipping: string;
    amount_paid: string;
    amount_due: number;
    logo: File | null;
    [key: string]: any;
};

export type InvoiceOcrResponse = {
    pages: number;
    entities: OCRInvoice[];
};

export type InvoiceCustomerStatsResponse = {
    stats: {
        total_invoices: number;
        total_business: number;
        invoices_overdue: number;
        total_balance_due: number;
    };
};

export type InvoiceItemSuggestionsResponse = {
    title: string;
    rate: number[];
}[];
