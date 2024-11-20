'use client';

import '@/app/globals.css';

import Image from 'next/image';
import KakaoLogin from '@/app/(components)/_user/KakaoLogin';
import Link from 'next/link';
import SignUpForm from '@/app/(components)/_user/SignUpForm';
import logo from '/public/images/bybl/logo.png';

export default function SignUp() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <article className="mx-auto flex flex-col justify-center items-center">
        <Link className="mx-auto mb-5" href={'/'}>
          <Image src={logo} alt="bybl-logo" width={400} height={80} />
        </Link>
        <KakaoLogin />
        <hr className="w-[471px] my-3" />
        <SignUpForm />
      </article>
    </section>
  );
}
