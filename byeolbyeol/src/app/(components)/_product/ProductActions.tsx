'use client';

import '@/app/globals.css';

import { ICart, ISelectedOption } from '@/app/util/types';

import addCart from '@/app/util/addCart';
import useStore from '@/store/useStore';

export default function ProductActions({
  storeName,
  productId,
  salePrice,
  selectedOptions,
}: {
  storeName: string;
  productId: number;
  salePrice: number;
  selectedOptions: ISelectedOption[];
}) {
  const { userId } = useStore();

  const handleAddToCart = async () => {
    if (selectedOptions.length < 1) {
      alert('옵션을 선택해주세요.');
      return;
    }
    for (const option of selectedOptions) {
      const productToCart = {
        productId: productId,
        option: option.option,
        quantity: option.quantity,
        storeName: storeName,
        salePrice: salePrice,
      } as ICart;

      await addCart(productToCart, userId);
    }

    alert('장바구니에 추가되었습니다.');
  };

  return (
    <div className="w-full flex justify-between">
      <button
        className="w-[23%] py-3 border border-primary rounded text-primary font-extrabold"
        onClick={handleAddToCart}
      >
        장바구니
      </button>
      <button className="w-9/12 py-3 bg-primary rounded text-white font-extrabold">구매하기</button>
    </div>
  );
}
