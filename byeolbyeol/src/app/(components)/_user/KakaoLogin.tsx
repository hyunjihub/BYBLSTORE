'use client';

import '@/app/globals.css';

import Image from 'next/image';
import kakao from '/public/images/kakao.svg';

export default function KakaoLogin() {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_KAKAO_REST_API
    }&redirect_uri=${'https://byblstore.vercel.app/oauth/kakao'}&response_type=code&scope=account_email,openid,profile_nickname`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      className="flex items-center justify-center gap-3 w-[455px] bg-[#FEE500] text-sm font-bold rounded-lg py-3"
      type="button"
      onClick={handleKakaoLogin}
    >
      <Image src={kakao} alt="kakao" width={20} height={20} />
      카카오로 시작하기
    </button>
  );
}
