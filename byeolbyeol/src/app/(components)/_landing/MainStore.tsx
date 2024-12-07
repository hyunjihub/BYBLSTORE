'use client';

import '@/app/globals.css';

import { IStore } from '@/app/util/types';
import Image from 'next/image';
import Link from 'next/link';

export default function MainStore({ stores }: { stores: IStore[] }) {
  return (
    <div className="flex justify-between">
      {stores.map((store, key) => {
        return (
          <Link className="w-[240px]" key={key} title={store.storeName} href={`/store/${store.storeId}`}>
            <div className="relative w-[240px] h-[150px] border rounded-2xl">
              <Image className="object-cover rounded-2xl" src={store.storeImg} alt={store.storeName} fill />
            </div>
            <p className="mt-3 px-3 font-extrabold text-center text-sm truncate">{store.storeName}</p>
            <p className="mt-1 text-center text-xs">{store.location}</p>
          </Link>
        );
      })}
    </div>
  );
}
