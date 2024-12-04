'use client';

import '@/app/globals.css';

import { ICart, IProduct } from '@/app/util/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { appFirestore } from '@/firebase/config';

export default function MyOrderProduct({ product }: { product: ICart }) {
  const [productInfo, setProductInfo] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(appFirestore, 'product'), where('productId', '==', product.productId));
        const querySnapshot = await getDocs(q);
        const productData = querySnapshot.docs[0].data() as IProduct;
        setProductInfo(productData);
      } catch {
        alert('상품 정보를 불러올 수 없습니다.');
      }
    };

    fetchProducts();
  }, [product.productId]);

  return (
    <>
      {productInfo && (
        <li className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <Link className="relative rounded w-24 h-24" href={`/product/${product.productId}`}>
              <Image
                className="object-cover rounded"
                src={productInfo.productImg[0]}
                alt={productInfo.productName}
                fill
              />
            </Link>
            <div className="ml-5">
              <Link className="font-extrabold text-lg" href={`/product/${product.productId}`}>
                {productInfo.productName}
              </Link>
              <p className="text-sm text-gray-500">{product.option}</p>
              <div className="flex gap-3 items-center">
                <p className="text-primary font-extrabold">
                  {(product.salePrice * product.quantity).toLocaleString('ko-kr')}원
                </p>
                <p className="text-sm">/ {product.quantity}개</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button className="text-sm border rounded-lg px-3 py-1">취소요청</button>
            <button className="text-sm border rounded-lg px-3 py-1">교환/문의</button>
          </div>
        </li>
      )}
    </>
  );
}
