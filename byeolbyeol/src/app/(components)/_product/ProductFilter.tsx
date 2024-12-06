'use client';

import '@/app/globals.css';

import { PRODUCT_FILTER } from '@/app/util/constant';

interface ProductFilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setProductEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductFilter({ filter, setFilter, setProductEnd }: ProductFilterProps) {
  const handleChangeFilter = (chagingFilter: string) => {
    setFilter(chagingFilter);
    setProductEnd(false);
  };

  return (
    <ul className="w-full mt-12 text-xs flex justify-end">
      {Object.keys(PRODUCT_FILTER).map((item, key) => {
        const typedFilter = item as keyof typeof PRODUCT_FILTER;
        return (
          <li
            className={`filter ${filter === PRODUCT_FILTER[typedFilter] ? 'font-extrabold' : ''}`}
            key={key}
            onClick={() => handleChangeFilter(PRODUCT_FILTER[typedFilter])}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
