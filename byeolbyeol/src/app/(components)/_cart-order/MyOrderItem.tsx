'use client';

import '@/app/globals.css';

import { IOrder } from '@/app/util/types';
import MyOrderProduct from './MyOrderProduct';

export default function MyOrderItem({ order }: { order: IOrder }) {
  return (
    <li className="w-[900px]">
      <div className="flex gap-2 items-center mb-3 border-b py-2">
        <p className="text-primary font-extrabold text-xl">상품준비중</p>
        <p className="text-gray-300">|</p>
        <p className="font-extrabold">{order.orderNum}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {order.products?.map((product, key) => {
          return <MyOrderProduct product={product} key={key} />;
        })}
      </ul>
    </li>
  );
}
