import { useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import Dropdown, { DropdownItem, DropdownMenu, DropdownTrigger } from '@components/atomic/Dropdown';
import { CreateInvoiceValues } from '../types';
import ArrowDownIcon from '@assets/icons/ArrowDownIcon';

const options = [
    { title: 'Invoice', key: 'invoice' },
    { title: 'Tax Invoice', key: 'tax_invoice' },
    { title: 'Proforma Invoice', key: 'proforma_invoice' },
];

function InvoiceTitle() {
    const [isOpened, setIsOpened] = useState(false);
    const [selectedOption, setSelectedOption] = useState(new Set(['invoice']));

    const { setValue, control } = useFormContext<CreateInvoiceValues>();
    const { title } = useWatch({
        control,
    });

    return (
        <Dropdown onOpenChange={setIsOpened}>
            <DropdownTrigger>
                <div className="flex items-center gap-3 cursor-pointer">
                    <p className="text-2xl md:text-5xl font-medium whitespace-nowrap">{title}</p>
                    <ArrowDownIcon
                        className={`mt-1 transition-transform ${isOpened ? 'rotate-180' : ''}`}
                        height={12}
                        width={12}
                    />
                </div>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Invoice Type selection"
                color="text"
                selectedKeys={selectedOption}
                selectionMode="single"
                variant="flat"
                onSelectionChange={keys => {
                    setSelectedOption(new Set(keys as any));
                    const [val] = keys;
                    const sel = options.find(option => option.key === val);
                    setValue('title', sel?.title || '');
                    setValue('isTitleChanged', true);
                }}
            >
                {options.map(option => (
                    <DropdownItem key={option.key}>{option.title}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

export default InvoiceTitle;
