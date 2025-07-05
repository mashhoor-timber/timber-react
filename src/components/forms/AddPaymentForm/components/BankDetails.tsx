import { useController, useFormContext } from 'react-hook-form';

import Input from '@components/atomic/Input';

export default function BankDetails() {
    const { control } = useFormContext();
    const {
        field: { value },
    } = useController({
        name: 'payment_method',
        control,
    });

    if (value === 'bank')
        return (
            <>
                    <Input
                        isRequired
                        label="Bank Name"
                        name="bank_name"
                        placeholder="Enter the bank name"
                    />
            </>
        );
    return null;
}
