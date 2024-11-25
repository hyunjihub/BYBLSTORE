'use client';

import { IStore } from '@/app/util/types';
import Image from 'next/image';

export default function FollowStore({ store }: { store: IStore }) {
  return (
    <li className="min-w-[450px] flex px-5 py-2 items-center justify-between border rounded-lg">
      <div className="flex gap-4 items-center">
        <div className="relative rounded-full w-12 h-12">
          <Image className="w-12 h-12 rounded-full object-cover" src={store.storeImg} alt={store.storeName} fill />
        </div>
        <div>
          <h2 className="text-primary font-black text-2xl">{store.storeName}</h2>
          <div className="flex gap-1">
            {store.tag.map((str, key) => (
              <p className="font-bold text-xs" key={key}>
                #{str}
              </p>
            ))}
          </div>
        </div>
      </div>

      <button className="text-xs hover:underline">제거</button>
    </li>
  );
}
