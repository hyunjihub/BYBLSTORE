'use client';

import '@/app/globals.css';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IProduct } from '@/app/types';
import ProductCard from '@/app/(components)/_product/ProductCard';
import { appFirestore } from '@/firebase/config';

export default function Product() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const querySnapshot = await getDocs(collection(appFirestore, 'product'));
        const productList: IProduct[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            productId: data.productId,
            productName: data.productName,
            originalPrice: data.originalPrice,
            salePrice: data.salePrice,
            createdAt: data.createdAt.toDate().toISOString(),
            storeId: data.storeId,
            productImg: data.productImg,
            options: data.options,
            productInfo: data.productInfo,
          };
        });
        setProducts(productList);
      } catch {
        alert('상품 정보를 불러올 수 없습니다. 다시 시도해주세요.');
      }
    };

    fetchProduct();
  }, []);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <article className="max-w-5xl mx-auto flex flex-col justify-center items-center">
        <h1 className="font-black text-3xl">PRODUCT</h1>
        <ul className="mt-24 flex">
          {products.map((product, key) => (
            <ProductCard product={product} key={key} />
          ))}
        </ul>
      </article>
    </section>
  );
}
