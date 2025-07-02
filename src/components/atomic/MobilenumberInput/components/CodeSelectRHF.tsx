import { useEffect, useState } from 'react';

import { Autocomplete, AutocompleteItem, Image } from '@heroui/react';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useController, useFormContext } from 'react-hook-form';

import countries from '../data/countries.json';
import useCountryList from '../hooks/useCountryList';

export default function CodeSelectRHF({ name }: { name: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const { items, hasMore, isLoading, onLoadMore } = useCountryList();
    const [selected, setSelected] = useState<any>(null);

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setOffset(items.length);
    }, [items]);

    useEffect(() => {
        // setOffset(selected);
    }, [selected]);

    useEffect(() => {
        setOffset(0);
        onLoadMore(0, query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore: () => onLoadMore(offset, query),
    });

    // const [field, meta, helpers] = useField(name);
    const { control, setValue } = useFormContext();
    // eslint-disable-next-line no-restricted-syntax
    const { field } = useController({
        name,
        control,
    });

    // eslint-disable-next-line no-restricted-syntax
    const [code, setCode] = useState(field.value);

    useEffect(() => {
        const sel = countries.find(i => i.code === code);
        setSelected(sel);
    }, [code]);

    useEffect(() => {
        const sel = countries.find(i => i.code === field.value);
        setSelected(sel);
    }, [field.value]);

    const handleInputChange = (val: string) => {
        if (val.length === 1 && /^\d$/.test(val)) {
            const t = `+${val}`;
            setCode(t);
            setValue(name, t);
        } else {
            setCode(val);
            setValue(name, val);
            setQuery(val);
        }
    };

    return (
        <Autocomplete
            allowsCustomValue
            isVirtualized
            showScrollIndicators
            aria-label="Select country"
            classNames={{
                base: 'border-none w-[150px]',
                popoverContent: 'bg-background w-[260px] scrollbar-thin',
            }}
            inputProps={{
                classNames: {
                    inputWrapper: 'border-none shadow-none ps-2',
                    input: 'ms-1 w-12',
                },
            }}
            inputValue={field.value || code}
            isClearable={false}
            isLoading={isLoading}
            items={items}
            label=""
            placeholder="Select country"
            scrollRef={scrollerRef}
            startContent={
                selected ? (
                    <Image
                        alt={selected?.name}
                        className="min-w-6 shadow-sm object-cover"
                        height={24}
                        radius="full"
                        src={selected?.flag}
                        width={24}
                    />
                ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                )
            }
            validationBehavior="aria"
            variant="bordered"
            onBlur={() => setValue(name, field.value, { shouldTouch: true })}
            onInputChange={handleInputChange}
            onOpenChange={setIsOpen}
        >
            {item => (
                <AutocompleteItem key={item.id} className="capitalize" textValue={item.code}>
                    <div className="flex items-center gap-2">
                        <Image
                            alt={item.name}
                            className="size-6 rounded-full shadow-sm object-cover flex-shrink-0"
                            height={24}
                            radius="full"
                            src={item.flag}
                            width={24}
                        />
                        <span>{item.code}</span>
                        <span className="text-default-500 truncate">{` (${item.name})`}</span>
                    </div>
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
}
