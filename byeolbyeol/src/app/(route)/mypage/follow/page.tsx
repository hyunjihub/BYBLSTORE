'use client';

import '@/app/globals.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import FollowStore from '@/app/(components)/_store/FollowStore';
import { IStore } from '@/app/util/types';
import { appFirestore } from '@/firebase/config';
import useStore from '@/store/useStore';

export default function MyFollow() {
  const { follow } = useStore();
  const [myFollowStore, setMyFollowStore] = useState<IStore[]>([]);

  useEffect(() => {
    const fetchingFollowStore = async () => {
      const q = query(collection(appFirestore, 'store'), where('storeId', 'in', follow));

      try {
        const querySnapshot = await getDocs(q);
        const storesData = querySnapshot.docs.map((doc) => doc.data() as IStore);
        setMyFollowStore(storesData);
      } catch {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchingFollowStore();
  }, [follow]);

  return (
    <article className="flex flex-col items-center justify-center">
      <ul className="mt-4 grid grid-cols-2 gap-5">
        {myFollowStore.map((store, key) => {
          return <FollowStore store={store} key={key} />;
        })}
      </ul>
    </article>
  );
}
