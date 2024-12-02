'use client';

import '@/app/globals.css';

import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { ICart } from '@/app/util/types';
import { appFirestore } from '@/firebase/config';
import useStore from '@/store/useStore';

interface CartQuantityProps {
  product: ICart;
  setCartItems: React.Dispatch<React.SetStateAction<ICart[]>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<ICart[]>>;
}

export default function CartQuantity({ product, setCartItems, setSelectedItems }: CartQuantityProps) {
  const [orderQuantity, setOrderQuantity] = useState(0);
  const { userId } = useStore();

  useEffect(() => {
    setOrderQuantity(product.quantity);
  }, [product.quantity]);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => (item.option === product.option ? { ...item, quantity: newQuantity } : item))
    );

    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.some((item) => item.option === product.option)) {
        return prevSelectedItems.map((item) =>
          item.option === product.option ? { ...item, quantity: newQuantity } : item
        );
      }
      return prevSelectedItems;
    });

    try {
      const cartRef = collection(appFirestore, 'cart');
      const q = query(
        cartRef,
        where('userId', '==', userId),
        where('productId', '==', product.productId),
        where('product.option', '==', product.option)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnapshot) => {
        const cartDocRef = doc(appFirestore, 'cart', docSnapshot.id);
        await updateDoc(cartDocRef, {
          'product.quantity': newQuantity,
        });
      });
    } catch {
      alert('수량 수정 중에 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex">
      <button
        className="w-7 h-7 font-extrabold border bg-gray-200"
        value="-"
        onClick={() => handleQuantityChange(orderQuantity - 1)}
      >
        -
      </button>
      <input
        className="w-10 text-center text-sm font-extrabold"
        type="number"
        min="1"
        value={orderQuantity}
        onChange={(e) => {
          const newQuantity = Math.max(1, Number(e.target.value));
          setOrderQuantity(newQuantity);
          handleQuantityChange(newQuantity);
        }}
      />
      <button
        className="w-7 h-7 font-extrabold border bg-gray-200"
        value="+"
        onClick={() => handleQuantityChange(orderQuantity + 1)}
      >
        +
      </button>
    </div>
  );
}
