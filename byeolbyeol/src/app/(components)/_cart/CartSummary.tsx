'use client';

import '@/app/globals.css';

import { useEffect, useState } from 'react';

import { ICart } from '@/app/util/types';

export default function CartSummary({ selectedItems }: { selectedItems: ICart[] }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = selectedItems.reduce((total, item) => total + item.salePrice * item.quantity, 0);
    setTotalPrice(price);
  }, [selectedItems]);

  return (
    <article className="w-[1020px] mt-6 bg-gray-100 border border-gray-200 rounded-lg px-5 py-2.5">
      <p className="text-xs flex justify-end items-center">
        총 {selectedItems.length}개의 상품 금액{' '}
        <span className="mx-2 text-sm font-extrabold">{totalPrice.toLocaleString('ko-kr')}원</span> + 배송비{' '}
        <span className="mx-2 text-sm font-extrabold">2,500원</span> = 합계{' '}
        <span className="mx-2 text-sm font-extrabold">{(totalPrice + 2500).toLocaleString('ko-kr')}원</span>
      </p>
    </article>
  );
}
