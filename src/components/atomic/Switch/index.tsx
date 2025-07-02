import { Switch as NextSwitch, SwitchProps } from '@heroui/react';
import { useController, useFormContext } from 'react-hook-form';

interface CustomSwitchProps extends SwitchProps {
    name: string;
}

export default function Switch({ name, size, ...props }: CustomSwitchProps) {
    const { control } = useFormContext();
    const {
        field: { onChange, ...field },
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <div className="flex items-center gap-2">
            <NextSwitch
                {...field}
                // defaultSelected={field.value}
                isInvalid={!!error}
                isSelected={field.value}
                size={size || 'sm'}
                variant="bordered"
                onChange={e => onChange(e.target.checked)}
                {...props}
            />
        </div>
    );
}
