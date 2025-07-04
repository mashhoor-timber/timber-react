export type InvoiceItem = {
    _id: string;
    company: string;
    title: string;
    rate: number;
    vat: number;
    discount: number;
    status: string;
    created_at: string;
};

export type AddInvoiceItemPayload = {
    company: string;
    title: string;
    rate: number;
    vat: number;
    discount: number;
};

export type UpdateInvoiceItemPayload = {
    _id: string;
    title?: string;
    rate?: number;
    vat?: number;
    discount?: number;
};

export type InvoiceItemsResponse = {
    invoice_items: InvoiceItem[];
    total: number;
};
