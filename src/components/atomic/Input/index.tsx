import { InputProps, Input as NextInput } from '@heroui/input';
import { Spinner } from '@heroui/react';
import { Field, FieldProps, getIn } from 'formik';
import { useController, useFormContext } from 'react-hook-form';

function FormikInput({ name, textEnd, isLoading, ...props }: CustomInputProps) {
    return (
        <Field name={name}>
            {({ field: formikField, form: { touched, errors, setFieldValue } }: FieldProps) => {
                const err = getIn(touched, name) && getIn(errors, name);

                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (props.type === 'file') {
                        setFieldValue(name, e.currentTarget.files);
                    } else {
                        setFieldValue(name, e.currentTarget.value);
                    }
                };

                const endContent = isLoading ? <Spinner size="sm" /> : props.endContent;

                return (
                    <NextInput
                        {...formikField}
                        classNames={{
                            inputWrapper: `h-[42px] border border-divider ${props.disabled ? 'bg-default-100' : ''}`,
                            label: 'font-medium',
                            input: textEnd ? 'text-end' : '',
                        }}
                        endContent={endContent}
                        errorMessage={err as string}
                        isInvalid={!!err}
                        labelPlacement="outside"
                        radius="md"
                        size="md"
                        validationBehavior="aria"
                        value={props.type === 'file' ? undefined : formikField.value}
                        variant="bordered"
                        onChange={handleChange}
                        {...props}
                    />
                );
            }}
        </Field>
    );
}

function RhfInput({ name, textEnd, isLoading, ...props }: CustomInputProps) {
    const { control } = useFormContext();
    const {
        field: { value, onChange, onBlur, ...field },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.type === 'file') {
            onChange(e.target.files);
        } else {
            onChange(e.target.value);
        }
    };

    const endContent = isLoading ? <Spinner size="sm" /> : props.endContent;

    return (
        <NextInput
            {...field}
            classNames={{
                inputWrapper: `h-[42px] border border-divider ${props.disabled ? 'bg-default-100' : ''}`,
                label: 'font-medium',
                input: textEnd ? 'text-end' : '',
            }}
            endContent={endContent}
            errorMessage={error?.message}
            isInvalid={!!error}
            labelPlacement="outside"
            radius="md"
            size="md"
            validationBehavior="aria"
            value={props.type === 'file' ? undefined : value}
            variant="bordered"
            onBlur={onBlur}
            onChange={handleChange}
            {...props}
        />
    );
}

interface CustomInputProps extends InputProps {
    name: string;
    textEnd?: boolean;
    isLoading?: boolean;
    formLib?: 'formik' | 'rhf';
}

export default function Input({ formLib = 'formik', ...props }: CustomInputProps) {
    if (formLib === 'formik') return <FormikInput {...props} />;
    return <RhfInput {...props} />;
}
