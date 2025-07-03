import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    role: Yup.string().trim().required('Role is required'),
    // country: Yup.string().trim().required('Country is required'),
    // city: Yup.string().trim().required('City is required'),
    email: Yup.string().trim().email('Invalid email format').required('Email is required'),
    mobile: Yup.string().trim().required('Mobile is required'),
    address: Yup.string().required('Address is required'),
    trn: Yup.string()
        .optional()
        .matches(/^\d{15}$/, 'TRN must be exactly 15 digits'),
});