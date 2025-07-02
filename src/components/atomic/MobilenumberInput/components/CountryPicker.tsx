import { Select, SelectItem } from '@heroui/react';
import { CountryIso2, defaultCountries, FlagImage, ParsedCountry } from 'react-international-phone';

type CountryPickerProps = {
    country: ParsedCountry;
    setCountry: (countryIso2: CountryIso2) => void;
};

export default function CountryPicker({ country, setCountry }: CountryPickerProps) {
    return (
        <div className="flex">
            <Select
                isVirtualized
                aria-label="Country picker"
                classNames={{
                    innerWrapper: 'w-6',
                    base: 'group bg-background',
                    trigger:
                        'shadow-none border-none bg-transparent group-hover:border-transparent ps-0 pe-8 w-fit data-[hover=true]:bg-background w-fit group-data-[focus=true]:bg-background',
                    listbox: 'whitespace-nowrap',
                    popoverContent: 'bg-background w-[250px] scrollbar-thin',
                }}
                placeholder=""
                renderValue={item => {
                    const iso2 = item[0].key;
                    return <FlagImage height={24} iso2={iso2 as CountryIso2} width={24} />;
                }}
                selectedKeys={[country.iso2]}
                onSelectionChange={keys => {
                    const selectedKeys = Array.from(keys);
                    setCountry(selectedKeys[0] as CountryIso2);
                }}
            >
                {defaultCountries.map(country => (
                    <SelectItem key={country[1]} textValue={country[0]}>
                        <div className="flex items-center gap-2">
                            <FlagImage height={24} iso2={country[1]} width={24} />
                            <span className="w-[170px] truncate">{country[0]}</span>
                        </div>
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}
