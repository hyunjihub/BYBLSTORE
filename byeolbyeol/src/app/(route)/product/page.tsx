'use client';

import '@/app/globals.css';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IProduct } from '@/app/util/types';
import ProductCard from '@/app/(components)/_product/ProductCard';
import ProductFilter from '@/app/(components)/_product/ProductFilter';
import { appFirestore } from '@/firebase/config';
import useFetchWishList from '@/app/hooks/useFetchWishlist';
import useStore from '@/store/useStore';

export default function Product() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [wishProducts, setWishProducts] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>('new');
  const { userId } = useStore();
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
        let productQuery;
        if (filter === 'new') {
          productQuery = query(collection(appFirestore, 'product'), orderBy('createdAt', 'desc'));
        } else if (filter === 'ascending') {
          productQuery = query(collection(appFirestore, 'product'), orderBy('salePrice', 'asc'));
        } else {
          productQuery = query(collection(appFirestore, 'product'), orderBy('salePrice', 'desc'));
        }

        const querySnapshot = await getDocs(productQuery);
        const products = querySnapshot.docs.map((doc) => doc.data() as IProduct);
        setProducts(products);
      } catch {
        alert('상품 정보를 불러올 수 없습니다. 다시 시도해주세요.');
      }
    };

    fetchProduct();
  }, [filter]);

  return (
    <section className="min-h-screen flex justify-center">
      <article className="max-w-5xl mt-40 mx-auto flex flex-col items-center">
        <h1 className="font-black text-3xl">PRODUCT</h1>
        <ProductFilter filter={filter} setFilter={setFilter} />
        <ul className="mt-3 grid grid-cols-4 gap-5">
          {products.map((product, key) => (
            <ProductCard product={product} wishList={wishProducts} setWishProducts={setWishProducts} key={key} />
          ))}
        </ul>
      </article>
    </section>
  );
}
