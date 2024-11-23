'use client';

import '@/app/globals.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IProduct } from '@/app/util/types';
import ProductHeader from '@/app/(components)/_product/ProductHeader';
import { appFirestore } from '@/firebase/config';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const q = query(collection(appFirestore, 'product'), where('productId', '==', Number(id)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setProduct(querySnapshot.docs[0].data() as IProduct);
        } else {
          alert('상품 정보를 찾을 수 없습니다.');
        }
      } catch {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <section className="min-h-screen flex justify-center">{product && <ProductHeader product={product} />}</section>
  );
}
