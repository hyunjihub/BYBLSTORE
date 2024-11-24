'use client';

import '@/app/globals.css';

import { IProduct, IStore } from '@/app/util/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import ProductCard from '@/app/(components)/_product/ProductCard';
import StoreInfo from '@/app/(components)/_store/StoreInfo';
import { appFirestore } from '@/firebase/config';
import { useParams } from 'next/navigation';

export default function StoreDetail() {
  const { id } = useParams();
  const [store, setStore] = useState<IStore | null>(null);
  const [storeProduct, setStoreProduct] = useState<IProduct[] | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        let q = query(collection(appFirestore, 'store'), where('storeId', '==', Number(id)));
        let querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setStore(querySnapshot.docs[0].data() as IStore);

          try {
            q = query(collection(appFirestore, 'product'), where('storeId', '==', Number(id)));
            querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const products = querySnapshot.docs.map((doc) => doc.data() as IProduct);
              setStoreProduct(products);
            } else {
              setStoreProduct([]);
            }
          } catch {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
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
      <article className="max-w-5xl mt-24 mb-40 mx-auto flex flex-col items-center">
        <h2 className="font-black text-3xl">PRODUCT</h2>
        {storeProduct && (
          <ul className="mt-8 grid grid-cols-4 gap-5">
            {storeProduct.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
