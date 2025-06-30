import * as Yup from 'yup';

export const expenseSchema = Yup.object().shape({
    amount: Yup.number()
        .typeError('Amount must be a number')
        .required('Please enter an Amount')
        .moreThan(0, 'Amount must be greater than 0'),
    type: Yup.string().required('Please enter a type'),
    category: Yup.string().nullable(),
    merchant: Yup.string().required('Please enter the merchant'),
    date: Yup.string().required('Please select a Date'),
    payment_method: Yup.string().required('Please enter method of payment'),
});

export const expenseCategorySchema = Yup.object().shape({
    category: Yup.string().required('Please enter a category'),
});