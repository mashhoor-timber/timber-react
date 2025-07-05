export type AddPaymentFormProps = {
    invoiceID: string;
    type: 'invoice' | 'bill';
};

export type InvoiceItem = {
    _id?: string;
    title: string;
    quantity: number;
    rate: number | string;
    vat: number;
    discount: number;
    total: number;
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