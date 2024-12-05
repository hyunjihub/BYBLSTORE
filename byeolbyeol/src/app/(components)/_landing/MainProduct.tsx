'use client';

import '@/app/globals.css';

import { IProduct } from '@/app/util/types';
import Image from 'next/image';
import Link from 'next/link';

export default function MainProduct({ products }: { products: IProduct[] }) {
  return (
    <div className="flex justify-between">
      {products.map((product, key) => {
        return (
          <Link className="w-[240px]" key={key} title={product.productName} href={`/product/${product.productId}`}>
            <div className="relative w-[240px] h-[150px] border rounded-2xl">
              <Image className="object-cover rounded-2xl" src={product.productImg[0]} alt={product.productName} fill />
            </div>
            <p className="mt-3 px-3 font-extrabold text-center text-sm truncate">{product.productName}</p>
            <p className="mt-1 text-center text-xs">{product.salePrice.toLocaleString('ko-kr')}원</p>
          </Link>
        );
      })}
    </div>
  );
}
