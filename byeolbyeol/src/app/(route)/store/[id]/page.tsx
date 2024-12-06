'use client';

import '@/app/globals.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IStore } from '@/app/util/types';
import StoreProduct from '@/app/(components)/_store/StoreProducts';
import { appFirestore } from '@/firebase/config';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const StoreInfo = dynamic(() => import('@/app/(components)/_store/StoreInfo'));

export default function StoreDetail() {
  const { id } = useParams();
  const [store, setStore] = useState<IStore | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const q = query(collection(appFirestore, 'store'), where('storeId', '==', Number(id)));
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
  }, [id]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <article className="max-w-5xl mt-40 mx-auto flex flex-col items-center">
        <h2 className="font-black text-3xl">STORE</h2>
        {store && <StoreInfo store={store} />}
      </article>
      <StoreProduct storeId={Number(id)} />
    </section>
  );
}
