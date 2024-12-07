'use client';

import '@/app/globals.css';

import StoreInfo from '@/app/(components)/_store/StoreInfo';
import StoreProduct from '@/app/(components)/_store/StoreProducts';
import { useParams } from 'next/navigation';

export default function StoreDetail() {
  const { id } = useParams();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <article className="max-w-5xl mt-40 mx-auto flex flex-col items-center">
        <h2 className="font-black text-3xl">STORE</h2>
        <StoreInfo storeId={Number(id)} />
      </article>
      <StoreProduct storeId={Number(id)} />
    </section>
  );
}
