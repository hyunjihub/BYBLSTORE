'use client';

import '@/app/globals.css';

import MyPageNav from '@/app/(components)/_layout/MyPageNav';
import MyPageProfile from '@/app/(components)/_user/MyPageProfile';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  const { userId } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      alert('비정상적인 접근입니다.');
      router.push('/');
    }
  });

  return (
    <section className="mx-auto max-w-5xl mt-24 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-black">MYPAGE</h1>
      <MyPageProfile />
      <MyPageNav />
      <article className="mt-10">{children}</article>
    </section>
  );
}
