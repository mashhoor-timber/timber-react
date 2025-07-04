export type InvoiceNumber = {
    enabled: boolean;
    next_number: number;
    sequence_length: number;
    prefix: string;
};

export type UpdateInvoiceNumberRequest = InvoiceNumber;

export interface NextInvoiceNumber {
    enabled: boolean;
    next_invoice_number: string;
}
