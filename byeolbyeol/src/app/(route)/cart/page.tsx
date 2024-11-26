'use client';

import '@/app/globals.css';

import CartList from '@/app/(components)/_cart/CartList';

export default function Cart() {
  return (
    <article className="mt-40 flex flex-col items-center justify-center">
      <h1 className="font-black text-3xl">CART</h1>
      <CartList />
    </article>
  );
}
