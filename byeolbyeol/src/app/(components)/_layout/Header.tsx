'use client';

import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import Link from 'next/link';
import logo from '/public/images/bybl/logo.png';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/signup') return null;

  return (
    <header className="flex items-center justify-between px-20 border-b border-black">
      <ul className="flex items-center gap-10 text-sm font-extrabold">
        <li>
          <Link href={'/store'}>STORE</Link>
        </li>
        <li>
          <Link href={'/product'}>PRODUCT</Link>
        </li>
      </ul>
      <Link href={'/'}>
        <Image src={logo} alt="bybl-logo" width={200} height={50} />
      </Link>
      <ul className="flex items-center gap-10 text-sm font-extrabold">
        <li>
          <Link href={'/login'}>LOGIN</Link>
        </li>
        <li>
          <Link href={'/signup'}>SIGNUP</Link>
        </li>
        <li>
          <IoSearch className="text-xl" />
        </li>
      </ul>
    </header>
  );
}
