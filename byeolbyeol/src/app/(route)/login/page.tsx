'use client';

import '@/app/globals.css';

import Image from 'next/image';
import KakaoLogin from '@/app/(components)/_user/KakaoLogin';
import Link from 'next/link';
import LoginForm from '@/app/(components)/_user/LoginForm';
import logo from '/public/images/bybl/logo.png';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <article className="max-w-5xl mx-auto flex flex-col justify-center items-center">
        <Link className="mx-auto mb-5" href={'/'}>
          <Image src={logo} alt="bybl-logo" width={400} height={80} />
        </Link>
        <LoginForm />
        <div className="mt-4 flex flex-col gap-3">
          <hr />
          <KakaoLogin />
          <p className="text-xs text-center">
            아직 별별스토어의 회원이 아니라면? &nbsp;&nbsp;
            <Link className="text-sm text-blue-500 font-bold hover:underline" href={'/signup'}>
              회원가입
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
}
