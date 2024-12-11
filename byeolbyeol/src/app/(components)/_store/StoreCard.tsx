'use client';

import '@/app/globals.css';

import { IStore } from '@/app/util/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  store: IStore;
}

export default function StoreCard({ store }: ProductCardProps) {
  return (
    <li className="w-60 rounded-lg border">
      <Link
        className="block relative w-full h-40 rounded-t overflow-hidden"
        href={`/store/${store.storeId}`}
        title={store.storeName}
      >
        <Image
          className="object-cover transform transition-transform duration-300 hover:scale-110"
          src={store.storeImg}
          alt={store.storeName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="p-3 flex flex-col gap-1.5">
        <Link
          className="font-extrabold text-lg min-h-6 product-card-name text-primary"
          href={`/store/${store.storeId}`}
          title={store.storeName}
        >
          {store.storeName}
        </Link>
        <p className="text-xs">{store.location}</p>
        <p className="text-sm line-clamp-2">{store.description}</p>
      </div>
    </li>
  );
}
