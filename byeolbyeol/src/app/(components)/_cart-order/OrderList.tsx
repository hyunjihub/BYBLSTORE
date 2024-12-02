'use client';

import '@/app/globals.css';

import { useEffect, useState } from 'react';

import { ICart } from '@/app/util/types';
import OrderForm from './OrderForm';
import OrderProduct from './OrderProduct';
import Summary from '@/app/(components)/_cart-order/Summary';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';

export default function OrderList() {
  const { userId } = useStore();
  const [orderProducts, setOrderProducts] = useState<ICart[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderProducts = async () => {
      if (!sessionStorage.getItem('orderProducts')) {
        alert('올바르지 않은 접근입니다.');
        router.push('/');
      } else {
        setOrderProducts(JSON.parse(sessionStorage.getItem('orderProducts') as string));
      }
    };

    fetchOrderProducts();
  }, [userId, router]);

  return (
    <article className="w-[1020px] mt-6 flex flex-col items-center justify-center">
      <table className="min-w-full bg-gray-100">
        <thead className="text-sm">
          <tr>
            <th className="py-2 px-4 border-b text-center">스토어</th>
            <th className="py-2 px-4 border-b text-center">제품/옵션</th>
            <th className="py-2 px-4 border-b text-center">상품가격</th>
            <th className="py-2 px-4 border-b text-center">할인가격</th>
            <th className="py-2 px-4 border-b text-center">수량</th>
            <th className="py-2 px-4 border-b text-center">배송비</th>
          </tr>
        </thead>
        <tbody className="bg-white border-none">
          {orderProducts.map((item, key) => {
            return <OrderProduct product={item} length={orderProducts.length} current={key} key={key} />;
          })}
        </tbody>
      </table>
      <Summary selectedItems={orderProducts} />
      <OrderForm orderProducts={orderProducts} />
    </article>
  );
}
