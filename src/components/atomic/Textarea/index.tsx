import { Textarea as NextTextarea, TextAreaProps } from '@heroui/input';
import { useController, useFormContext } from 'react-hook-form';

interface CustomTextareaProps extends TextAreaProps {
    name: string;
}

export default function Textarea({ name, ...props }: CustomTextareaProps) {
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <NextTextarea
            {...field}
            classNames={{
                inputWrapper: `border scrollbar-thin`,
                input: 'text-sm placeholder:text-sm mt-[6px]',
                label: 'text-sm mt-1 font-medium',
            }}
            errorMessage={error?.message as string}
            isInvalid={!!error}
            labelPlacement="outside"
            radius="sm"
            size="lg"
            variant="bordered"
            {...props}
        />
    );
}
