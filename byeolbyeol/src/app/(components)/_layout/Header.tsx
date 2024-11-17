'use client';

import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import Link from 'next/link';
import logo from '/public/images/bybl/logo.png';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-20 border-b border-black">
      <ul className="flex items-center gap-10 font-bold">
        <li>STORE</li>
        <li>PRODUCT</li>
      </ul>
      <Link href={'/'}>
        <Image src={logo} alt="bybl-logo" width={200} height={50} />
      </Link>
      <ul className="flex items-center gap-10 font-bold">
        <li>LOGIN</li>
        <li>SIGNUP</li>
        <li>
          <IoSearch className="text-xl" />
        </li>
      </ul>
    </header>
  );
}
