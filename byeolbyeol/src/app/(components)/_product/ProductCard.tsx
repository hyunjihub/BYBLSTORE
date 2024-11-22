'use client';

import '@/app/globals.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IProduct } from '@/app/types';
import Image from 'next/image';
import { IoCartOutline } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';
import Link from 'next/link';
import { appFirestore } from '@/firebase/config';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    const fetchStoreName = async () => {
      try {
        const q = query(collection(appFirestore, 'store'), where('storeId', '==', product.storeId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const storeData = querySnapshot.docs[0].data();
          setStoreName(storeData.storeName);
        } else {
          alert('스토어 정보를 찾을 수 없습니다.');
        }
      } catch {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchStoreName();
  }, [product.storeId]);

  return (
    <li className="w-60 rounded-lg border">
      <Link href={`/product/${product.productId}`}>
        <div className="relative w-full h-40 rounded-t">
          <Image className="object-cover" src={product.productImg[0]} alt={product.productName} fill />
        </div>

        <div className="p-3 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="font-extrabold text-sm text-primary">{storeName}</p>
            <div className="flex justify-end items-center gap-3 text-gray-400 text-2xl">
              <IoCartOutline />
              <IoHeartOutline />
            </div>
          </div>
          <h2 className="font-extrabold mt-1 min-h-12 product-card-name">{product.productName}</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString('ko-kr')}원</p>
            <p className="text-lg font-extrabold text-red-500">{product.salePrice.toLocaleString('ko-kr')}원</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
