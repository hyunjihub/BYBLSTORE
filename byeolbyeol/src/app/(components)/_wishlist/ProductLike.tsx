'use client';

import '@/app/globals.css';

import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IProduct } from '@/app/util/types';
import { appFirestore } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';

interface ProductLikeProps {
  product: IProduct;
  wishList: number[];
  setWishProducts: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function ProductLike({ product, wishList, setWishProducts }: ProductLikeProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { userId } = useStore();
  const router = useRouter();

  useEffect(() => {
    setIsLiked(wishList.includes(product.productId));
  }, [product.productId, wishList]);

  const handleToggleLike = (productId: number) => {
    if (!userId) {
      router.push('/login');
      return;
    }

    setWishProducts((prevWishList) => {
      const isAlreadyLiked = prevWishList.some((productId) => productId === product.productId);

      if (isAlreadyLiked) {
        removeFromWishlist(productId);
        return prevWishList.filter((productId) => productId !== product.productId);
      } else {
        addToWishlist(productId);
        return [...prevWishList, productId];
      }
    });
  };

  const addToWishlist = async (productId: number) => {
    if (userId) {
      const userQuery = query(collection(appFirestore, 'users'), where('userId', '==', userId));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(appFirestore, 'users', userDoc.id);

        try {
          await updateDoc(userRef, {
            wish: arrayUnion(productId),
          });

          alert('위시리스트에 추가되었습니다.');
        } catch {
          alert('위시리스트에 추가에 실패했습니다.');
        }
      }
    }
  };

  const removeFromWishlist = async (productId: number) => {
    if (userId) {
      const userQuery = query(collection(appFirestore, 'users'), where('userId', '==', userId));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(appFirestore, 'users', userDoc.id);

        try {
          await updateDoc(userRef, {
            wish: arrayRemove(productId),
          });

          alert('위시리스트에서 제거되었습니다.');
        } catch {
          alert('위시리스트 삭제에 실패했습니다.');
        }
      }
    }
  };

  return (
    <>
      {isLiked ? (
        <IoHeartSharp
          className="cursor-pointer text-lg text-red-400"
          onClick={() => handleToggleLike(product.productId)}
        />
      ) : (
        <IoHeartOutline
          className="cursor-pointer text-lg text-gray-500"
          onClick={() => handleToggleLike(product.productId)}
        />
      )}
    </>
  );
}
