'use client';

import '@/app/globals.css';

import { STORE_FILTER } from '@/app/util/constant';

interface ProductFilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setStoreEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StoreFilter({ filter, setFilter, setStoreEnd }: ProductFilterProps) {
  const handleChangeFilter = (chagingFilter: string) => {
    setFilter(chagingFilter);
    setStoreEnd(false);
  };

  return (
    <ul className="w-full mt-12 text-xs flex justify-end">
      {Object.keys(STORE_FILTER).map((item, key) => {
        const typedFilter = item as keyof typeof STORE_FILTER;
        return (
          <li
            className={`filter ${filter === STORE_FILTER[typedFilter] ? 'font-extrabold' : ''}`}
            key={key}
            onClick={() => handleChangeFilter(STORE_FILTER[typedFilter])}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
