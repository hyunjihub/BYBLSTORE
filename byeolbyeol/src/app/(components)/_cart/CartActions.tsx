'use client';

import '@/app/globals.css';

export default function CartActions() {
  return (
    <div className="mt-5 w-full flex justify-between items-center text-sm">
      <button className="bg-gray-200 rounded-lg px-5 py-2">선택 상품 삭제</button>
      <div className="flex gap-5">
        <button className="bg-gray-200 rounded-lg px-5 py-2">선택 상품 구매</button>
        <button className="bg-primary text-white rounded-lg px-5 py-2">전체 상품 구매</button>
      </div>
    </div>
  );
}
