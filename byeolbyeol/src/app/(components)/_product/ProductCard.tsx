'use client';

import '@/app/globals.css';

import { useEffect, useState } from 'react';

import { IProduct } from '@/app/util/types';
import Image from 'next/image';
import { IoHeartOutline } from 'react-icons/io5';
import Link from 'next/link';
import useFetchStoreName from '@/app/hooks/useFetchStoreName';

export default function ProductCard({ product }: { product: IProduct }) {
  const [storeName, setStoreName] = useState('');
  const storeNameFromHook = useFetchStoreName({ storeId: product.storeId });

  useEffect(() => {
    const fetchStoreNameAsync = async () => {
      const name = await storeNameFromHook;
      setStoreName(name);
    };

    fetchStoreNameAsync();
  }, [storeNameFromHook]);

  return (
    <li className="w-60 rounded-lg border">
      <Link
        className="block relative w-full h-40 rounded-t overflow-hidden"
        href={`/product/${product.productId}`}
        title={product.productName}
      >
        <Image
          className="object-cover transform transition-transform duration-300 hover:scale-110"
          src={product.productImg[0]}
          alt={product.productName}
          fill
        />
      </Link>

      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Link className="font-extrabold text-sm text-primary" href={`/store/${product.storeId}`}>
            {storeName}
          </Link>
          <IoHeartOutline className="cursor-pointer text-lg text-gray-500" />
        </div>
        <Link
          className="font-extrabold mt-1 min-h-12 product-card-name"
          href={`/product/${product.productId}`}
          title={product.productName}
        >
          {product.productName}
        </Link>
        <div className="flex items-end gap-2">
          <p className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString('ko-kr')}원</p>
          <p className="font-extrabold text-red-500">{product.salePrice.toLocaleString('ko-kr')}원</p>
        </div>
      </div>
    </li>
  );
}
