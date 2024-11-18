'use client';

import '@/app/globals.css';

import { appAuth, appFirestore } from '@/firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';

import Image from 'next/image';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import logo from '/public/images/bybl/logo.png';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const credential = await createUserWithEmailAndPassword(appAuth, data.email, data.password);
      const user = credential.user;
      const userDoc = doc(collection(appFirestore, 'users'));
      await setDoc(userDoc, {
        uid: user.uid,
        email: data.email,
        nickname: data.nickname,
        profile_image: '',
        created_at: new Date().toISOString(),
      });
      alert('정상적으로 가입되었습니다.');
      router.push('/');
    } catch (error) {
      console.log(error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <article className="max-w-5xl mx-auto flex flex-col justify-center items-center">
        <Link className="mx-auto mb-5" href={'/'}>
          <Image src={logo} alt="bybl-logo" width={400} height={80} />
        </Link>
        <button className="w-[471px] bg-[#FEE500] text-sm font-bold rounded-lg py-3" type="button">
          카카오로 시작하기
        </button>
        <hr className="w-[471px] my-3" />
        <form className="mx-auto flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="mt-3 flex flex-col text-sm gap-2 font-bold">
            <p className="flex items-center gap-1">
              아이디 (이메일 주소) <span className="text-red-500">*</span>
            </p>
            <input
              className="p-3 border rounded text-sm outline-none font-normal"
              type="text"
              placeholder="아이디 (이메일 주소)"
              {...register('email', {
                required: '이메일 주소는 필수입니다.',
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
              })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </label>
          <label className="flex flex-col text-sm gap-2 font-bold">
            <p className="flex items-center gap-1">
              비밀번호 <span className="text-red-500">*</span>
            </p>
            <input
              className="p-3 border rounded text-sm outline-none font-normal"
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: '비밀번호는 필수입니다.',
                minLength: { value: 6, message: '비밀번호는 최소 6자리여야 합니다.' },
              })}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </label>
          <label className="flex flex-col text-sm gap-2 font-bold">
            <p className="flex items-center gap-1">
              비밀번호 확인 <span className="text-red-500">*</span>
            </p>
            <input
              className="p-3 border rounded text-sm outline-none font-normal"
              type="password"
              placeholder="비밀번호 확인"
              {...register('passwordConfirm', {
                required: '비밀번호 확인은 필수입니다.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.passwordConfirm && <span className="text-red-500 text-xs">{errors.passwordConfirm.message}</span>}
          </label>
          <label className="flex flex-col text-sm gap-2 font-bold">
            <p className="flex items-center gap-1">
              닉네임 <span className="text-red-500">*</span>
            </p>
            <input
              className="p-3 border rounded text-sm outline-none font-normal"
              type="text"
              placeholder="닉네임"
              {...register('nickname', { required: '닉네임은 필수입니다.' })}
            />
            {errors.nickname && <span className="text-red-500 text-xs">{errors.nickname.message}</span>}
          </label>
          <button className="mt-3 bg-primary text-sm text-white font-extrabold rounded-lg py-3 px-52" type="submit">
            회원가입
          </button>
        </form>
      </article>
    </section>
  );
}
