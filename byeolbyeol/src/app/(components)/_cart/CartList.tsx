'use client';

import '@/app/globals.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import CartActions from './CartActions';
import CartProduct from './CartProduct';
import CartSummary from '@/app/(components)/_cart/CartSummary';
import { ICart } from '@/app/util/types';
import { appFirestore } from '@/firebase/config';
import useStore from '@/store/useStore';

export default function CartList() {
  const { userId } = useStore();
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const [selectedItems, setSelectedItems] = useState<ICart[]>([]);

  useEffect(() => {
    const fetchCartProduct = async () => {
      if (userId) {
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

          setCartItems(cartData);
          setSelectedItems(cartData);
        } catch {
          alert('카트 정보를 불러올 수 없습니다.');
        }
      } else {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      }
    };

    fetchCartProduct();
  }, [userId]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(cartItems);
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <article className="w-[1020px] mt-6 flex flex-col items-center justify-center">
      <table className="min-w-full bg-gray-100">
        <thead className="text-sm">
          <tr>
            <th className="py-2 px-4 border-b text-center flex items-center justify-center h-full">
              <input
                className="h-[30px]"
                type="checkbox"
                onChange={handleSelectAll}
                checked={cartItems.length === selectedItems.length}
              />
            </th>
            <th className="py-2 px-4 border-b text-center">스토어</th>
            <th className="py-2 px-4 border-b text-center">제품/옵션</th>
            <th className="py-2 px-4 border-b text-center">상품가격</th>
            <th className="py-2 px-4 border-b text-center">할인가격</th>
            <th className="py-2 px-4 border-b text-center">수량</th>
            <th className="py-2 px-4 border-b text-center">배송비</th>
          </tr>
        </thead>
        <tbody className="bg-white border-none">
          {cartItems.map((item, key) => {
            return (
              <CartProduct
                product={item}
                length={cartItems.length}
                current={key}
                key={key}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            );
          })}
        </tbody>
      </table>
      <CartSummary selectedItems={selectedItems} />
      <CartActions setCartItems={setCartItems} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </article>
  );
}
