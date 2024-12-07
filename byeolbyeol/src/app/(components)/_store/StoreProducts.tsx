'use client';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IProduct } from '@/app/util/types';
import { appFirestore } from '@/firebase/config';
import dynamic from 'next/dynamic';
import useFetchWishList from '@/app/hooks/useFetchWishlist';
import useStore from '@/store/useStore';

const ProductCard = dynamic(() => import('@/app/(components)/_product/ProductCard'));

export default function StoreProduct({ storeId }: { storeId: number }) {
  const { userId } = useStore();
  const [wishProducts, setWishProducts] = useState<number[]>([]);
  const wishlistHook = useFetchWishList({ userId: userId as string });
  const [storeProduct, setStoreProduct] = useState<IProduct[] | null>(null);

  useEffect(() => {
    const fetchtWishProductsAsync = async () => {
      const wish = await wishlistHook;
      setWishProducts(wish);
    };

    if (userId) {
      fetchtWishProductsAsync();
    }
  }, [wishlistHook, userId]);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const q = query(collection(appFirestore, 'product'), where('storeId', '==', storeId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const products = querySnapshot.docs.map((doc) => doc.data() as IProduct);
          setStoreProduct(products);
        } else {
          setStoreProduct([]);
        }
      } catch {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchStore();
  }, [storeId]);

  return (
    <>
      {storeProduct && (
        <ul className="grid grid-cols-4 gap-5">
          {storeProduct.map((product, key) => (
            <ProductCard wishList={wishProducts} setWishProducts={setWishProducts} product={product} key={key} />
          ))}
        </ul>
      )}
    </>
  );
}
