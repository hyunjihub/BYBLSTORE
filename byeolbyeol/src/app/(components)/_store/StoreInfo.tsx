'use client';

import { IStore } from '@/app/util/types';
import Image from 'next/image';
import { PiPlus } from 'react-icons/pi';

export default function StoreInfo({ store }: { store: IStore }) {
  return (
    <div className="w-[1020px] mt-8 rounded-lg border flex">
      <div className="relative w-96 w-48 object-cover">
        <Image className="rounded-l-lg" src={store.storeImg} alt={store.storeName} fill priority />
      </div>

      <div className="px-10 py-5 flex-1">
        <div className="flex gap-1">
          {store.tag.map((tag, key) => (
            <p className="font-extrabold text-sm" key={key}>
              #{tag}
            </p>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <h1 className="mt-1 text-primary text-4xl font-black">{store.storeName}</h1>
          <button className="bg-primary text-white py-2 px-4 flex gap-8 text-sm">
            팔로우({store.follower})<PiPlus className="text-lg" />
          </button>
        </div>
        <p className="mt-2 text-sm">{store.location}</p>
        <small>{store.locationInfo}</small>
        <p className="mt-5">{store.description}</p>
      </div>
    </div>
  );
}
