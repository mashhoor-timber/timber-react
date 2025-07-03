export type Employee = {
    _id: string;
    employee_id: string;
    name: string;
    country_code: string;
    mobile: string;
    basic_salary: number;
    allowance: number;
    designation: string;
    is_active: boolean;
    joining_date: null | string;
    total_salary?: number;
};

export type Salary = {
    _id: string;
    employee: Employee;
    company: {
        _id: string;
        name: string;
        currency: string;
        wafeq_key?: string;
        zoho_org_id?: string;
    };
    month: number;
    year: number;
    basic_salary: number;
    allowance: number;
    deduction: number;
    net_salary: number;
    is_paid: boolean;
    created_at: string;
    zoho_expense_id?: string;
    wafeq_expense_id?: string;
};

export type AllSalariesResponse = {
    salaries: Salary[];
    total: number;
};
