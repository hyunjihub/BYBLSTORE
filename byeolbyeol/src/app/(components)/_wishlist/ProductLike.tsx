'use client';

import '@/app/globals.css';

import { IProduct } from '@/app/util/types';
import { IoHeartOutline } from 'react-icons/io5';

export default function ProductLike({ productId, wishList }: { productId: number; wishList: IProduct[] }) {
  return <IoHeartOutline className="cursor-pointer text-lg text-gray-500" />;
}
