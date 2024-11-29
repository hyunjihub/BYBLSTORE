'use client';

import '@/app/globals.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { ICart } from '@/app/util/types';
import OrderProduct from './OrderProduct';
import Summary from '@/app/(components)/_cart-order/Summary';
import { appFirestore } from '@/firebase/config';
import useStore from '@/store/useStore';

export default function OrderList() {
  const { userId } = useStore();
  const [orderProducts, setOrderProducts] = useState<ICart[]>([]);

  useEffect(() => {
    const fetchOrderProducts = async () => {
      if (!sessionStorage.getItem('orderProducts')) {
        try {
          const cartRef = collection(appFirestore, 'cart');
          const q = query(cartRef, where('userId', '==', userId));
          const querySnapshot = await getDocs(q);

          const cartData: ICart[] = [];
          querySnapshot.forEach((doc) => {
            const cartItem = {
              productId: doc.data().productId,
              quantity: doc.data().product.quantity,
              option: doc.data().product.option,
              storeName: doc.data().storeName,
              salePrice: doc.data().salePrice,
            } as ICart;
            cartData.push(cartItem);
          });

          setOrderProducts(cartData);
        } catch {
          alert('상품 정보를 불러올 수 없습니다.');
        }
      } else {
        setOrderProducts(JSON.parse(sessionStorage.getItem('orderProducts') as string));
      }
    };

    fetchOrderProducts();
  }, [userId]);

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
    </article>
  );
}
