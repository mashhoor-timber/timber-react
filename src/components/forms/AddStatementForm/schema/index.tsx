import * as Yup from 'yup';

export const EmployeeSchema = Yup.object().shape({
    employee_id: Yup.string().trim().required('Employee ID is required'),
    name: Yup.string().trim().required('Name is required'),
    designation: Yup.string().trim().required('Designation is required'),
    mobile: Yup.string().trim().required('Mobile number is required'),
    basic_salary: Yup.number()
        .required('Basic Salary is required')
        .positive('Basic Salary must be positive'),
    allowance: Yup.number()
        .required('Allowance is required')
        .positive('Allowance must be positive'),
    joining_date: Yup.string().required('Joining Date date is required'),
});
