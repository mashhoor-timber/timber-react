export type PaymentRecord = {
    _id: string;
    user: string;
    company: string;
    invoice: string;
    date: string;
    payment_method: string;
    cheque_no: string;
    cheque_date: string;
    cheque_due_date: string;
    amount: number;
    file: string;
    is_paid: boolean;
    zoho_payment_id: string;
    wafeq_payment_id: string;
    created_at: string;
    updated_at: string;
    bank_name?: string;
};

export type PaymentRecordResponse = {
    payment_records: PaymentRecord[];
    total: number;
};

export type PaymentRecordRequest = {
    invoice: string;
    company: string;
    date: string;
    payment_method: string;
    cheque_no?: string;
    cheque_date?: string;
    cheque_due_date?: string;
    amount: number;
    file: FileList | null;
    bank_name?: string;
};
