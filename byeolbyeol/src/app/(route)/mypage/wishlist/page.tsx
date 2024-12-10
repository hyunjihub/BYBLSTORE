'use client';

import '@/app/globals.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IProduct } from '@/app/util/types';
import Link from 'next/link';
import ProductCard from '@/app/(components)/_product/ProductCard';
import { TbShoppingBagHeart } from 'react-icons/tb';
import { appFirestore } from '@/firebase/config';
import useFetchWishList from '@/app/hooks/useFetchWishlist';
import useStore from '@/store/useStore';

export default function WishList() {
  const { userId } = useStore();
  const [wishProducts, setWishProducts] = useState<number[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const wishlistHook = useFetchWishList({ userId: userId as string });

  useEffect(() => {
    const fetchWishProductsAsync = async () => {
      const wish = await wishlistHook;
      setWishProducts(wish);
    };

    if (userId) {
      fetchWishProductsAsync();
    }
  }, [wishlistHook, userId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productQuery = query(collection(appFirestore, 'product'), where('productId', 'in', wishProducts));
        const querySnapshot = await getDocs(productQuery);
        const products = querySnapshot.docs.map((doc) => doc.data() as IProduct);
        setProducts(products);
      } catch {
        alert('상품 정보를 불러올 수 없습니다. 다시 시도해주세요.');
      }
    };

    if (wishProducts.length > 0) fetchProduct();
  }, [wishProducts]);

  return (
    <article className="flex flex-col items-center justify-center">
      {products.length > 0 ? (
        <ul className="mt-4 grid grid-cols-4 gap-5">
          {products.map((product, key) => {
            return (
              <ProductCard product={product} wishList={wishProducts} setWishProducts={setWishProducts} key={key} />
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <TbShoppingBagHeart className="text-7xl text-primary mt-16 mb-5" />
          <p className="font-extrabold text-2xl">위시리스트에 추가된 상품이 없습니다.</p>
          <small className="text-gray-500">아직 담긴 상품이 없어요! 마음에 드는 상품을 추가해보세요.</small>
          <Link className="mt-5 py-2 px-4 text-white bg-primary rounded-lg text-xs " href={'/product'} role="button">
            PRODUCT 바로가기
          </Link>
        </div>
      )}
    </article>
  );
}
