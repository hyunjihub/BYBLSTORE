'use client';

import Link from 'next/link';
import useStore from '@/store/useStore';

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
  const { userId } = useStore();

  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute left-0 top-0 bg-white w-64 h-full z-20 menu" onClick={(e) => e.stopPropagation()}>
            <ul className="flex flex-col items-start px-4 pt-16 gap-6 font-extrabold">
              <li className="hover:bg-gray-200 w-full py-2 px-2 rounded-lg">
                <Link href={'/store'} onClick={() => setIsMenuOpen(false)}>
                  STORE
                </Link>
              </li>
              <li className="hover:bg-gray-200 w-full py-2 px-2 rounded-lg">
                <Link href={'/product'} onClick={() => setIsMenuOpen(false)}>
                  PRODUCT
                </Link>
              </li>
              <li className="hover:bg-gray-200 w-full py-2 px-2 rounded-lg">
                <Link href={userId ? '/mypage' : '/signup'} onClick={() => setIsMenuOpen(false)}>
                  {userId ? 'MYPAGE' : 'SIGNUP'}
                </Link>
              </li>
              <li className="hover:bg-gray-200 w-full py-2 px-2 rounded-lg">
                {userId ? (
                  <button onClick={() => setIsMenuOpen(false)}>LOGOUT</button>
                ) : (
                  <Link href={'/login'} onClick={() => setIsMenuOpen(false)}>
                    LOGIN
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
