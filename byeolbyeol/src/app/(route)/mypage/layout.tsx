'use client';

import '@/app/globals.css';

import Image from 'next/image';
import { IoMdSettings } from 'react-icons/io';
import Link from 'next/link';
import profile from '/public/images/tmp.jpg';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useStore from '@/store/useStore';

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  const pathname = usePathname();
  const { nickname, profileImg } = useStore();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <section className="mx-auto max-w-5xl mt-24 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-black">MYPAGE</h1>
      <div className="mt-10 w-[200px] h-[200px] relative rounded-full">
        <Image
          className="rounded-full object-cover"
          src={profileImg ? profileImg : profile}
          alt="profile"
          width={300}
          height={300}
        />
      </div>
      <div className="flex items-center">
        <p className="text-2xl font-extrabold">{nickname}</p>
        <IoMdSettings className="ml-3 text-3xl text-gray-500" />
      </div>
      <nav className="mt-8 flex gap-20">
        <Link
          className={`hover:underline ${pathname.includes('/wishlist') ? 'font-extrabold underline' : ''}`}
          href={'/mypage/wishlist'}
        >
          WISHLIST
        </Link>
        <Link
          className={`hover:underline ${pathname.includes('/myorder') ? 'font-extrabold underline' : ''}`}
          href={'/mypage/myorder'}
        >
          MYORDER
        </Link>
        <Link
          className={`hover:underline ${pathname.includes('/follow') ? 'font-extrabold underline' : ''}`}
          href={'/mypage/follow'}
        >
          FOLLOW
        </Link>
      </nav>

      <article className="mt-10">{children}</article>
    </section>
  );
}
