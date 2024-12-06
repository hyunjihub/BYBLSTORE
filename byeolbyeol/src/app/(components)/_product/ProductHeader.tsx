'use client';

import '@/app/globals.css';

import { IProduct, ISelectedOption } from '@/app/util/types';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import ProductActions from './ProductActions';
import ProductImageCarousel from './ProductImageCarousel';
import ProductOptions from './ProductOptions';
import { getFormattedDate } from '@/app/util/getFormattedDate';
import useFetchStoreName from '@/app/hooks/useFetchStoreName';

export default function ProductHeader({ product }: { product: IProduct }) {
  const [storeName, setStoreName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<ISelectedOption[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const storeNameFromHook = useFetchStoreName({ storeId: product.storeId });

  useEffect(() => {
    const fetchStoreNameAsync = async () => {
      const name = await storeNameFromHook;
      setStoreName(name);
    };

    fetchStoreNameAsync();
  }, [storeNameFromHook]);

  useEffect(() => {
    const optionsTotal = selectedOptions.reduce((total, option) => total + option.quantity, 0);
    const calculatedTotal = optionsTotal * product.salePrice;
    setTotalAmount(calculatedTotal);
  }, [selectedOptions, product.salePrice]);

  return (
    <article className="max-w-5xl mt-24 flex gap-10">
      <ProductImageCarousel productImg={product.productImg} productName={product.productName} />
      <div className="w-[500px] flex flex-col gap-2">
        <Link className="text-primary font-bold" href={`/store/${product.storeId}`}>
          {storeName}
        </Link>
        <h1 className="font-extrabold text-3xl">{product.productName}</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-400 text-sm line-through">{product.originalPrice.toLocaleString('ko-kr')}원</p>
          <p className="text-red-500 text-lg font-extrabold">{product.salePrice.toLocaleString('ko-kr')}원</p>
        </div>
        <hr className="my-2" />
        <div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-xs text-gray-500">
              배송일 <span className="text-sm text-black">{getFormattedDate(2)} 도착 예정</span>
            </p>
            <p className="flex items-center gap-2 text-xs text-gray-500">
              배송비 <span className="text-sm text-black">2,500원</span>
            </p>
          </div>
        </div>
        <ProductOptions
          options={product.options}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <div className="mt-2 flex justify-between items-center">
          <p className="font-extrabold text-sm">총 상품 금액</p>
          <p className="text-primary text-xl font-extrabold">{totalAmount.toLocaleString('ko-kr')}원</p>
        </div>
        <ProductActions
          storeName={storeName}
          productId={product.productId}
          salePrice={product.salePrice}
          selectedOptions={selectedOptions}
        />
      </div>
    </article>
  );
}
