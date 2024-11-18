'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MyPageNav() {
  const pathname = usePathname();

  return (
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
  );
}
