'use client';

import '@/app/globals.css';

import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';

import { ICart } from '@/app/util/types';
import Link from 'next/link';
import { appFirestore } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';

interface CartProductProps {
  setCartItems: React.Dispatch<React.SetStateAction<ICart[]>>;
  selectedItems: ICart[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ICart[]>>;
}

export default function CartActions({ setCartItems, selectedItems, setSelectedItems }: CartProductProps) {
  const { userId } = useStore();
  const router = useRouter();

  const handleRemoveCart = async () => {
    if (selectedItems.length > 0) {
      if (confirm('선택하신 상품들을 장바구니에서 삭제하시겠습니까?')) {
        if (userId) {
          try {
            const cartRef = collection(appFirestore, 'cart');

            for (const item of selectedItems) {
              const cartQuery = query(
                cartRef,
                where('userId', '==', userId),
                where('productId', '==', item.productId),
                where('product.option', '==', item.option)
              );
              const cartSnapshot = await getDocs(cartQuery);

              cartSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
              });
            }
          } catch {
            alert('상품 삭제에 실패했습니다. 다시 시도해주세요.');
          }
        } else {
          let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

          cart = cart.filter(
            (item: ICart) =>
              !selectedItems.some(
                (selectedItem) => selectedItem.productId === item.productId && selectedItem.option === item.option
              )
          );

          sessionStorage.setItem('cart', JSON.stringify(cart));
        }
        setSelectedItems([]);
        setCartItems((prevCartItems) =>
          prevCartItems.filter(
            (item) =>
              !selectedItems.some(
                (selectedItem) => selectedItem.productId === item.productId && selectedItem.option === item.option
              )
          )
        );
        alert('선택된 상품들이 삭제되었습니다.');
      }
    } else {
      alert('삭제할 상품을 선택해주세요.');
    }
  };

  const handleSelectedOrder = () => {
    if (selectedItems.length > 0) {
      sessionStorage.setItem('orderProducts', JSON.stringify(selectedItems));
      router.push('/order');
    } else {
      alert('구매할 상품을 선택해주세요.');
    }
  };

  return (
    <div className="mt-5 w-full flex justify-between items-center text-sm">
      <button className="bg-gray-200 rounded-lg px-5 py-2" onClick={handleRemoveCart}>
        선택 상품 삭제
      </button>
      <div className="flex gap-5">
        <button className="bg-gray-200 rounded-lg px-5 py-2" onClick={handleSelectedOrder}>
          선택 상품 구매
        </button>
        <Link className="bg-primary text-white rounded-lg px-5 py-2" href={'/order'} role="button">
          전체 상품 구매
        </Link>
      </div>
    </div>
  );
}
