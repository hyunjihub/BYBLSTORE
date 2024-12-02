'use client';

import '@/app/globals.css';

import { ICart, ICartProduct } from '@/app/util/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import CartQuantity from './CartQuantity';
import Image from 'next/image';
import Link from 'next/link';
import { appFirestore } from '@/firebase/config';

interface CartProductProps {
  product: ICart;
  length: number;
  current: number;
  selectedItems: ICart[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ICart[]>>;
  setCartItems: React.Dispatch<React.SetStateAction<ICart[]>>;
}

export default function CartProduct({
  product,
  length,
  current,
  setSelectedItems,
  selectedItems,
  setCartItems,
}: CartProductProps) {
  const [productInfo, setProductInfo] = useState<ICartProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = collection(appFirestore, 'product');
        const q = query(productRef, where('productId', '==', product.productId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const data = doc.data();

            const productData = {
              productName: data.productName,
              originalPrice: data.originalPrice,
              productImg: data.productImg,
              storeId: data.storeId,
            } as ICartProduct;
            setProductInfo(productData);
          });
        } else {
          alert('상품 정보를 불러오는데 실패했습니다.');
        }
      } catch {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchProduct();
  }, [product.productId]);

  const handleSelectItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems((prevSelected) => [...prevSelected, product]);
    } else {
      setSelectedItems((prevSelected) => prevSelected.filter((selected) => selected.option !== product.option));
    }
  };

  return (
    <>
      {productInfo && (
        <tr>
          <td className="py-4 px-6 border-b text-center">
            <input
              type="checkbox"
              onChange={handleSelectItem}
              checked={selectedItems.some((item) => item.option === product.option)}
            />
          </td>
          <td className="py-4 px-6 border-b text-xs font-extrabold text-center">
            <Link href={`/store/${productInfo.storeId}`}>{product.storeName}</Link>
          </td>
          <td className="py-4 px-6 border-b flex items-center gap-2">
            <div className="flex items-center gap-3">
              <Link className="relative w-14 h-14 rounded-full" href={`/product/${product.productId}`}>
                <Image
                  className="w-14 h-14 rounded-full border cursor-pointer object-cover"
                  src={productInfo.productImg[0]}
                  alt={productInfo.productName}
                  fill
                />
              </Link>
              <div className="flex flex-col">
                <Link className="max-w-60 font-extrabold" href={`/product/${product.productId}`}>
                  {productInfo.productName}
                </Link>
                <small className="p-0 text-gray-400 text-[11px]">옵션 : {product.option}</small>
              </div>
            </div>
          </td>
          <td className="py-4 px-6 border-b text-xs text-center">
            {productInfo.originalPrice.toLocaleString('ko-kr')}원
          </td>
          <td className="py-4 px-6 border-b text-sm text-primary font-extrabold text-center">
            {product.salePrice.toLocaleString('ko-kr')}원
          </td>
          <td className="py-4 px-6 border-b text-center">
            <CartQuantity product={product} setCartItems={setCartItems} setSelectedItems={setSelectedItems} />
          </td>
          {current === 0 && (
            <td className="py-4 px-6 border-b text-xs text-center" rowSpan={length}>
              <span>2,500원</span>
            </td>
          )}
        </tr>
      )}
    </>
  );
}
