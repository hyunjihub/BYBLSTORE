'use client';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IStore } from '@/app/util/types';
import Image from 'next/image';
import StoreDetail from './StoreDetail';
import { appFirestore } from '@/firebase/config';

export default function StoreInfo({ storeId }: { storeId: number }) {
  const [store, setStore] = useState<IStore | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const q = query(collection(appFirestore, 'store'), where('storeId', '==', storeId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setStore(querySnapshot.docs[0].data() as IStore);
        } else {
          alert('스토어 정보를 찾을 수 없습니다.');
        }
      } catch {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchStore();
  }, [storeId]);

  return (
    <>
      {store && (
        <div className="w-[1020px] mt-8 rounded-lg border flex">
          <div className="relative w-96 w-48 ">
            <Image
              className="rounded-l-lg object-cover"
              src={store.storeImg}
              alt={store.storeName}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <StoreDetail store={store} />
        </div>
      )}
    </>
  );
}
