'use client';

import '@/app/globals.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IOrder } from '@/app/util/types';
import MyOrderItem from '@/app/(components)/_cart-order/MyOrderItem';
import { appFirestore } from '@/firebase/config';
import useStore from '@/store/useStore';

export default function MyOrder() {
  const { userId } = useStore();
  const [myOrders, setMyOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchingOrders = async () => {
      const q = query(collection(appFirestore, 'orders'), where('userId', '==', userId));

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const orderData = querySnapshot.docs.map((doc) => doc.data() as IOrder);
          setMyOrders(orderData);
        }
      } catch {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    if (userId) fetchingOrders();
  }, [userId]);

  return (
    <article className="w-[1020px] flex flex-col items-center justify-center">
      <ul className="mt-4 flex flex-col gap-5 w-full items-center mb-32">
        {myOrders.map((order, key) => {
          return <MyOrderItem order={order} key={key} />;
        })}
      </ul>
    </article>
  );
}
