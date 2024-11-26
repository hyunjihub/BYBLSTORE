'use client';

import '@/app/globals.css';

export default function CartSummary() {
  return (
    <article className="w-[1020px] mt-6 bg-gray-100 border border-gray-200 rounded-lg px-5 py-2.5">
      <p className="text-xs flex justify-end items-center">
        총 3개의 상품 금액 <span className="mx-2 text-sm font-extrabold">37,500원</span> + 배송비{' '}
        <span className="mx-2 text-sm font-extrabold">2,500원</span> = 합계{' '}
        <span className="mx-2 text-sm font-extrabold">40,000원</span>
      </p>
    </article>
  );
}
