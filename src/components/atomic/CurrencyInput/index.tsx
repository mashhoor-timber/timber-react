/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-extraneous-dependencies
import { InputProps, Input as NextInput } from '@heroui/input';
import { Field, FieldProps } from 'formik';

interface CurrencyInputProps extends InputProps {
    name: string;
    currencyName: string; // Name for currency field in Formik
    currencyOptions: { label: string; value: string }[];
    defaultCurrency?: string;
    isCurrencyDisabled?: boolean;
}

export default function CurrencyInput({
    name,
    currencyName,
    currencyOptions,
    defaultCurrency,
    isCurrencyDisabled,
    ...props
}: CurrencyInputProps) {
    return (
        <Field name={name}>
            {({ field, form: { touched, errors, setFieldValue, values } }: FieldProps) => {
                const error = touched[name] && errors[name];
                return (
                    <NextInput
                        {...field}
                        {...props}
                        classNames={{
                            inputWrapper: 'h-[42px] border border-divider bg-white',
                            label: `font-medium ${props.labelPlacement === 'outside-left' ? 'w-[150px]' : ''}`,
                            input: `${props.labelPlacement === 'outside-left' ? 'h-[42px]' : ''}`,
                            base: `${props.labelPlacement === 'outside-left' ? '' : ''}`,
                        }}
                        errorMessage={error as string}
                        isInvalid={!!error}
                        radius="md"
                        size="md"
                        startContent={
                            <div className="flex items-center">
                                <label className="sr-only" htmlFor={`${name}-currency`}>
                                    Currency
                                </label>
                                <select
                                    aria-label="Currency"
                                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                                    defaultValue={defaultCurrency}
                                    disabled={isCurrencyDisabled}
                                    id={`${name}-currency`}
                                    name={`${name}-currency`}
                                    value={values[currencyName]}
                                    onChange={e => setFieldValue(currencyName, e.target.value)} // Update currency value in Formik
                                >
                                    {currencyOptions.map((currency: any) => (
                                        <option key={currency.value} value={currency.value}>
                                            {currency.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }
                        validationBehavior="aria"
                        variant="bordered"
                        onChange={e => setFieldValue(name, e.target.value)}
                    />
                );
            }}
        </Field>
    );
}
