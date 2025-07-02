import { useEffect, useState } from 'react';

import countries from '../data/countries.json';

export default function useCountryList() {
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const limit = 20;

    const loadCountry = async (currentOffset: number, query?: string) => {
        setIsLoading(true);
        let data: any[] = countries;
        if (query) {
            data = countries.filter(
                country =>
                    country.name.toLowerCase().includes(query.toLowerCase()) ||
                    country.code.includes(query)
            );
        }
        await new Promise(resolve => {
            setTimeout(resolve, 100);
        });
        data = data.slice(0, currentOffset + limit);
        setItems(data);
        if (data.length === countries.length) {
            setHasMore(false);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadCountry(0, undefined);
    }, []);

    const onLoadMore = (offset1: number, query: string) => {
        loadCountry(offset1, query);
    };

    return {
        items,
        hasMore,
        isLoading,
        onLoadMore,
    };
}
