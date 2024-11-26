'use client';

import '@/app/globals.css';

import { ICart, ICartProduct } from '@/app/util/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { appFirestore } from '@/firebase/config';

export default function CartProduct({ product }: { product: ICart }) {
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
              salePrice: data.salePrice,
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

  return (
    <>
      {productInfo && (
        <tr>
          <td className="py-4 px-6 border-b">
            <input type="checkbox" />
          </td>
          <td className="py-4 px-6 border-b text-xs font-extrabold">
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
                <Link className="font-extrabold" href={`/product/${product.productId}`}>
                  {productInfo.productName}
                </Link>
                <small className="p-0 text-gray-400 text-[11px]">옵션 : {product.option}</small>
              </div>
            </div>
          </td>
          <td className="py-4 px-6 border-b text-xs">{productInfo.originalPrice.toLocaleString('ko-kr')}원</td>
          <td className="py-4 px-6 border-b text-sm text-primary font-extrabold">
            {productInfo.salePrice.toLocaleString('ko-kr')}원
          </td>
          <td className="py-4 px-6 border-b">
            <input
              className="w-16 text-center product-quantity text-sm font-extrabold"
              type="number"
              min="1"
              defaultValue={product.quantity}
            />
          </td>
          <td className="py-4 px-6 border-b text-xs">
            <span>2,500원</span>
          </td>
        </tr>
      )}
    </>
  );
}
