import { useController, useFormContext } from 'react-hook-form';

import DatePicker from '@components/atomic/DatePicker';
import Input from '@components/atomic/Input';

export default function ChequeDetails() {
    const { control } = useFormContext();
    const {
        field: { value },
    } = useController({
        name: 'payment_method',
        control,
    });
    if (value === 'cheque')
        return (
            <>
                <Input
                    isRequired
                    label="Cheque Number"
                    name="cheque_no"
                    placeholder="Enter the cheque number"
                />

                <DatePicker isRequired label="Cheque Date" name="cheque_date" />

                <DatePicker
                    disablePastDates
                    isRequired
                    label="Cheque Due Date"
                    name="cheque_due_date"
                />
            </>
        );
    return null;
}
