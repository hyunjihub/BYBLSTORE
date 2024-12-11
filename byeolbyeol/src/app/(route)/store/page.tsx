'use client';

import '@/app/globals.css';

import { DocumentData, collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IStore } from '@/app/util/types';
import StoreCard from '@/app/(components)/_store/StoreCard';
import StoreFilter from '@/app/(components)/_store/StoreFilter';
import { appFirestore } from '@/firebase/config';

export default function Product() {
  const [stores, setStores] = useState<IStore[]>([]);
  const [filter, setFilter] = useState<string>('name');
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [storeEnd, setStoreEnd] = useState(false);

  const firstFetchProducts = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      let storeQuery;
      if (filter === 'name') {
        storeQuery = query(collection(appFirestore, 'store'), orderBy('storeName', 'asc'), limit(4));
      } else {
        storeQuery = query(collection(appFirestore, 'store'), orderBy('follower', 'desc'), limit(4));
      }

      const querySnapshot = await getDocs(storeQuery);
      if (querySnapshot.empty) {
        setStoreEnd(true);
      }
      const newStores = querySnapshot.docs.map((doc) => doc.data() as IStore);
      setStores(newStores);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch (error) {
      console.log(error);
      alert('스토어 정보를 불러올 수 없습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }, [filter, loading]);

  useEffect(() => {
    firstFetchProducts();
  }, [filter]);

  const fetchProducts = useCallback(async () => {
    if (loading || storeEnd) return;

    setLoading(true);
    try {
      let storeQuery;
      if (filter === 'name') {
        storeQuery = query(
          collection(appFirestore, 'store'),
          orderBy('storeName', 'asc'),
          startAfter(lastVisible),
          limit(8)
        );
      } else {
        storeQuery = query(
          collection(appFirestore, 'store'),
          orderBy('follower', 'desc'),
          startAfter(lastVisible),
          limit(8)
        );
      }

      const querySnapshot = await getDocs(storeQuery);
      const newStores = querySnapshot.docs.map((doc) => doc.data() as IStore);
      if (newStores.length < 8 || querySnapshot.empty) {
        setStoreEnd(true);
      }
      setStores((prevStores) => [...prevStores, ...newStores]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch {
      alert('스토어 정보를 불러올 수 없습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }, [filter, lastVisible, loading, storeEnd]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !storeEnd) {
          fetchProducts();
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [fetchProducts, loading, storeEnd]);

  return (
    <section className="min-h-screen flex justify-center">
      <article className="max-w-5xl mt-32 mx-auto flex flex-col items-center">
        <h1 className="font-black text-3xl">STORE</h1>
        <StoreFilter filter={filter} setFilter={setFilter} setStoreEnd={setStoreEnd} />
        <ul className="w-full mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-32">
          {stores.map((store, key) => (
            <StoreCard store={store} key={key} />
          ))}
          <div ref={observerRef}>{/*마지막 요소*/}</div>
        </ul>
      </article>
    </section>
  );
}
