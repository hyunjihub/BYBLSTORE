'use client';

import '@/app/globals.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IProduct } from '@/app/util/types';
import ProductCard from '@/app/(components)/_product/ProductCard';
import { appFirestore } from '@/firebase/config';
import useFetchWishList from '@/app/hooks/useFetchWishlist';
import { useSearchParams } from 'next/navigation';
import useStore from '@/store/useStore';

export default function Product() {
  const { userId } = useStore();
  const param = useSearchParams();
  const searchWord = param.get('word');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [wishProducts, setWishProducts] = useState<number[]>([]);
  const wishlistHook = useFetchWishList({ userId: userId as string });

  useEffect(() => {
    const fetchStoreNameAsync = async () => {
      const wish = await wishlistHook;
      setWishProducts(wish);
    };

    if (userId) {
      fetchStoreNameAsync();
    }
  }, [wishlistHook, userId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productQuery = query(collection(appFirestore, 'product'), where('tag', 'array-contains', searchWord));
        const querySnapshot = await getDocs(productQuery);
        const products = querySnapshot.docs.map((doc) => doc.data() as IProduct);
        setProducts(products);
      } catch {
        alert('상품 정보를 불러올 수 없습니다. 다시 시도해주세요.');
      }
    };

    fetchProduct();
  }, [searchWord]);

  return (
    <section className="min-h-screen flex justify-center">
      <article className="max-w-5xl mt-40 mx-auto flex flex-col items-center">
        <h1 className="font-black text-3xl">Search</h1>
        <h2>
          <strong>{searchWord}</strong>에 대한 검색결과입니다.
        </h2>
        <ul className="w-full mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-32">
          {products.map((product, key) => (
            <ProductCard product={product} wishList={wishProducts} setWishProducts={setWishProducts} key={key} />
          ))}
        </ul>
      </article>
    </section>
  );
}
