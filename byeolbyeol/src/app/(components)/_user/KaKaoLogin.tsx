'use client';

import '@/app/globals.css';

import Image from 'next/image';
import kakao from '/public/images/kakao.svg';

export default function KakaoLogin() {
  return (
    <button
      className="flex items-center justify-center gap-3 w-[455px] bg-[#FEE500] text-sm font-bold rounded-lg py-3"
      type="button"
    >
      <Image src={kakao} alt="kakao" width={20} height={20} />
      카카오로 시작하기
    </button>
  );
}
