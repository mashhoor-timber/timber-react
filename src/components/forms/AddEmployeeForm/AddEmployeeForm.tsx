import Button from '@components/atomic/Button';
import DatePicker from '@components/atomic/DatePicker';
import Input from '@components/atomic/Input';
import MobilenumberInput from '@components/atomic/MobilenumberInput';

import { EmployeeSchema } from './schema';
import Form from "@components/atomic/Form";
import { useTimberClient } from 'providers/TimberProvider';
import { Employee } from './types';

export default function AddEmployeeForm() {
    const timberClient = useTimberClient();

    const initialValues: Employee = {
        _id: '',
        employee_id: '',
        name: '',
        designation: '',
        mobile: '',
        basic_salary: ,
        allowance: ,
        joining_date: null as string | null,
        country_code: '+971',
        is_active: true,
    }
    const onSubmit = async (values: Employee) => {
        const employee: Employee = {
            ...values,
        }
        await timberClient.employee.create(employee)
    }
    return (
        <Form
            defaultValues={initialValues}
            schema={EmployeeSchema}
            onSubmit={onSubmit}
            resetOnSubmit
        >
            {({ formState: { isSubmitting, isValid, isDirty, errors } }) => (
                <div className="space-y-3">
                    <Input
                        isRequired
                        label="Employee Name"
                        name="name"
                        placeholder="Enter employee name"
                    />
                    <Input
                        isRequired
                        label="Employee ID"
                        name="employee_id"
                        placeholder="Enter employee ID"
                    />
                    <Input
                        isRequired
                        label="Designation"
                        name="designation"
                        placeholder="Enter designation"
                    />
                    <Input
                        isRequired
                        label="Basic Salary"
                        name="basic_salary"
                        placeholder="Enter basic salary"
                    />
                    <Input
                        isRequired
                        label="Allowance"
                        name="allowance"
                        placeholder="Enter allowance"
                    />
                    <MobilenumberInput
                        isRequired
                        label="Mobile"
                        nameCode="country_code"
                        nameMobile="mobile"
                    />
                    <DatePicker
                        disableFutureDates
                        isRequired
                        showMonthAndYearPickers
                        label="Joining Date"
                        name="joining_date"
                    />
                    <Button color="primary" isLoading={isSubmitting} type="submit">
                        Submit
                    </Button>
                </div>

            )}
        </Form>

    );
}
