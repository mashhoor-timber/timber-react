import { useFormContext } from 'react-hook-form';

// import { useAppSelector } from '@hooks/store';

// import { allInvoiceCustomers, suggestedCustomers } from '../../api/invoiceCustomer';
import SelectCustomer from './SelectCustomer';
import { InvoiceCustomer } from '../types';

type Props = {
    setRole: (role: 'biller' | 'customer') => void;
    addCustomerModal: any;
    editCustomerModal: any;
    setSelectedUser: any;
};

function ChooseCustomer({ setRole, addCustomerModal, editCustomerModal, setSelectedUser }: Props) {
    // const company = useAppSelector(state => state.company);

    const handleAddUser = (userRole: 'biller' | 'customer') => {
        setRole(userRole);
        addCustomerModal.onOpen();
    };

    const handleEditUser = (item: any) => {
        setSelectedUser(item);
        editCustomerModal.onOpen();
    };

    const { setValue } = useFormContext();

    const handleCustomerChange = (value: InvoiceCustomer | undefined) => {
        if (!value) return;
        setValue('customer', { ...value, id: value._id }, { shouldValidate: true });
    };
    return (
        <SelectCustomer
            buttonOnClick={() => handleAddUser('customer')}
            buttonText="Add Customer"
            editOnClick={handleEditUser}
            label=""
            name="customer.customer_id"
            placeholder="Select saved customer or add new customer"
            onSelChange={handleCustomerChange}
        />
    );
}

export default ChooseCustomer;
