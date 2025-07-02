export type UserPayload = {
    name: string;
    email: string;
    mobile: string;
    country_code: string;
    country: string;
    city: string;
    address: string;
    trn?: string;
    role: 'customer' | 'vendor' | 'biller';
    logo?: File | null;
};