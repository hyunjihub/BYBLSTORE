'use client';

import '@/app/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import orderImg from '/public/images/order.png';
import { useSearchParams } from 'next/navigation';

const OrderSuccess = () => {
  const params = useSearchParams();
  const orderNum = params.get('ordernum');

  return (
    <article className="mt-32 flex flex-col items-center justify-center">
      <h1 className="font-black text-3xl">ORDER</h1>
      <Image className="mt-24" src={orderImg} alt="order-success" width={100} height={100} />
      <h2 className="mt-5 text-xl font-bold">
        주문이 <strong>완료</strong>되었습니다.
      </h2>
      <p className="mt-2">
        주문하신 상품의 주문번호는 <span className="font-extrabold text-primary">{orderNum}</span>입니다.
      </p>
      <p className="mt-2 text-sm">
        주문내역 및 배송에 관한 안내는 마이페이지 내 <span className="underline">MYORDER</span>를 통해 확인 가능합니다.
      </p>
      <div className="mt-5 flex items-center gap-3">
        <Link className="text-sm rounded-lg bg-primary text-white py-2 px-4" href={'/product'} role="button">
          계속 소핑하기
        </Link>
        <Link className="text-sm rounded-lg text-primary border border-primary py-2 px-3" href={'/mypage/myorder'}>
          주문상세보기
        </Link>
      </div>
    </article>
  );
};

const OrderSuccessPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <OrderSuccess />
  </Suspense>
);

export default OrderSuccessPage;
