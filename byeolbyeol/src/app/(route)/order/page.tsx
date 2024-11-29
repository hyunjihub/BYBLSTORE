'use client';

import '@/app/globals.css';

import OrderList from '@/app/(components)/_cart-order/OrderList';

export default function Order() {
  return (
    <article className="mt-40 flex flex-col items-center justify-center">
      <h1 className="font-black text-3xl">ORDER</h1>
      <OrderList />
    </article>
  );
}
