'use client';

import { useEffect, useState } from 'react';

import Follow from './Follow';
import { IStore } from '@/app/util/types';
import useStore from '@/store/useStore';

export default function StoreDetail({ store }: { store: IStore }) {
  const { follow } = useStore();
  const [isFollow, setIsFollow] = useState(false);
  const [followCount, setFollowCount] = useState(0);

  useEffect(() => {
    setIsFollow(follow?.includes(store.storeId) ?? false);
    setFollowCount(store.follower);
  }, [follow, store]);

  return (
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
        <Follow
          storeId={store.storeId}
          isFollow={isFollow}
          setIsFollow={setIsFollow}
          followCount={followCount}
          setFollowCount={setFollowCount}
        />
      </div>
      <p className="mt-2 text-sm">{store.location}</p>
      <small>{store.locationInfo}</small>
      <p className="mt-5">{store.description}</p>
    </div>
  );
}
