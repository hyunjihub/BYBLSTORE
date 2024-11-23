'use client';

import '@/app/globals.css';

import { PRODUCT_FILTER } from '@/app/util/constant';

interface ProductFilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductFilter({ filter, setFilter }: ProductFilterProps) {
  return (
    <ul className="w-full mt-12 text-sm flex justify-end">
      {Object.keys(PRODUCT_FILTER).map((item, key) => {
        const typedFilter = item as keyof typeof PRODUCT_FILTER;
        return (
          <li
            className={`filter ${filter === PRODUCT_FILTER[typedFilter] ? 'font-extrabold' : ''}`}
            key={key}
            onClick={() => setFilter(PRODUCT_FILTER[typedFilter])}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
