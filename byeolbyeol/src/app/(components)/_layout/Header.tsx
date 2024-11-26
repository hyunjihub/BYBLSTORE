'use client';

import { GrCart } from 'react-icons/gr';
import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import Link from 'next/link';
import { appAuth } from '@/firebase/config';
import logo from '/public/images/bybl/logo.png';
import { signOut } from 'firebase/auth';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';

export default function Header() {
  const pathname = usePathname();
  const { setData, userId } = useStore();
  const router = useRouter();

  if (pathname === '/login' || pathname === '/signup') return null;

  const handleLogout = async () => {
    try {
      await signOut(appAuth);
      alert('로그아웃 처리 되었습니다.');
      setData({ userId: null, profileImg: null, nickname: null, follow: null });
      router.push('/');
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

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
        <li>{userId ? <button onClick={handleLogout}>LOGOUT</button> : <Link href={'/login'}>LOGIN</Link>}</li>
        <li>
          <Link href={userId ? '/mypage' : '/signup'}>{userId ? 'MYPAGE' : 'SIGNUP'}</Link>
        </li>
        <li>
          <Link href={'/cart'}>
            <GrCart className="text-xl cursor-pointer" />
          </Link>
        </li>
        <li>
          <IoSearch className="text-xl cursor-pointer" />
        </li>
      </ul>
    </header>
  );
}
