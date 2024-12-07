'use client';

import '@/app/globals.css';

import { DocumentData, collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [productEnd, setProductEnd] = useState(false);

  useEffect(() => {
    const fetchWishProductsAsync = async () => {
      const wish = await wishlistHook;
      setWishProducts(wish);
    };

    if (userId) {
      fetchWishProductsAsync();
    }
  }, [wishlistHook, userId]);

  const firstFetchProducts = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      let productQuery;
      if (filter === 'new') {
        productQuery = query(collection(appFirestore, 'product'), orderBy('createdAt', 'desc'), limit(4));
      } else if (filter === 'ascending') {
        productQuery = query(collection(appFirestore, 'product'), orderBy('salePrice', 'asc'), limit(4));
      } else {
        productQuery = query(collection(appFirestore, 'product'), orderBy('salePrice', 'desc'), limit(4));
      }

      const querySnapshot = await getDocs(productQuery);
      if (querySnapshot.empty) {
        setProductEnd(true);
      }
      const newProducts = querySnapshot.docs.map((doc) => doc.data() as IProduct);
      setProducts(newProducts);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch {
      alert('상품 정보를 불러올 수 없습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }, [filter, loading]);

  useEffect(() => {
    firstFetchProducts();
  }, [filter]);

  const fetchProducts = useCallback(async () => {
    if (loading || productEnd) return;

    setLoading(true);
    try {
      let productQuery;
      if (filter === 'new') {
        productQuery = query(
          collection(appFirestore, 'product'),
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(12)
        );
      } else if (filter === 'ascending') {
        productQuery = query(
          collection(appFirestore, 'product'),
          orderBy('salePrice', 'asc'),
          startAfter(lastVisible),
          limit(12)
        );
      } else {
        productQuery = query(
          collection(appFirestore, 'product'),
          orderBy('salePrice', 'desc'),
          startAfter(lastVisible),
          limit(12)
        );
      }

      const querySnapshot = await getDocs(productQuery);
      const newProducts = querySnapshot.docs.map((doc) => doc.data() as IProduct);
      if (newProducts.length < 12 || querySnapshot.empty) {
        setProductEnd(true);
      }
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch {
      alert('상품 정보를 불러올 수 없습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }, [filter, lastVisible, loading, productEnd]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !productEnd) {
          fetchProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchProducts, loading, productEnd]);

  return (
    <section className="min-h-screen flex justify-center">
      <article className="max-w-5xl mt-40 mx-auto flex flex-col items-center">
        <h1 className="font-black text-3xl">PRODUCT</h1>
        <ProductFilter filter={filter} setFilter={setFilter} setProductEnd={setProductEnd} />
        <ul className="mt-3 grid grid-cols-4 gap-5 mb-32">
          {products.map((product, key) => (
            <ProductCard product={product} wishList={wishProducts} setWishProducts={setWishProducts} key={key} />
          ))}
          <div ref={observerRef}>{/*마지막 요소*/}</div>
        </ul>
      </article>
    </section>
  );
}
