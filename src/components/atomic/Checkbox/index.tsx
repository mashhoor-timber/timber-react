// eslint-disable-next-line import/no-extraneous-dependencies
import { CheckboxProps, Checkbox as NextCheckbox } from '@heroui/react';
import { Field, FieldProps, getIn } from 'formik';

interface CustomCheckboxProps extends CheckboxProps {
    name: string;
}

export default function Checkbox({ name, ...props }: CustomCheckboxProps) {
    return (
        <Field name={name}>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
                const err = getIn(touched, name) && getIn(errors, name);
                return (
                    <NextCheckbox
                        {...field}
                        classNames={{
                            icon: 'text-light',
                            label: 'text-sm whitespace-nowrap',
                        }}
                        errorMessage={err as string}
                        isInvalid={!!err}
                        isSelected={field.value}
                        labelPlacement="outside"
                        size="md"
                        validationBehavior="aria"
                        variant="bordered"
                        onChange={e => {
                            setFieldValue(name, e.target.checked);
                        }}
                        {...props}
                    />
                );
            }}
        </Field>
    );
}
