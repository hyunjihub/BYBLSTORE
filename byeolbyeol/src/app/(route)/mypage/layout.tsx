'use client';

import '@/app/globals.css';

import MyPageNav from '@/app/(components)/_layout/MyPageNav';
import MyPageProfile from '@/app/(components)/_user/MyPageProfile';

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <section className="mx-auto max-w-5xl mt-24 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-black">MYPAGE</h1>
      <MyPageProfile />
      <MyPageNav />
      <article className="mt-10">{children}</article>
    </section>
  );
}
