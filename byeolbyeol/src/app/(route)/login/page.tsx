'use client';

import '@/app/globals.css';

import { appAuth, appFirestore } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/bybl/logo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { setData } = useStore();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await signInWithEmailAndPassword(appAuth, data.email, data.password);
      const userDocs = await getDocs(query(collection(appFirestore, 'users'), where('email', '==', user.user.email)));
      if (!userDocs.empty) {
        const userData = userDocs.docs[0].data();

        const newData = {
          userId: userData.userId,
          profileImg: userData.profileImg,
          nickname: userData.nickname,
        };
        setData(newData);
        router.push('/');
      } else {
        console.log('사용자 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <article className="max-w-5xl mx-auto flex flex-col justify-center items-center">
        <Link className="mx-auto mb-5" href={'/'}>
          <Image src={logo} alt="bybl-logo" width={400} height={80} />
        </Link>
        <form className="mx-auto flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', { required: '이메일 주소를 입력해주세요.' })}
            className="p-3 border rounded text-sm outline-none font-normal"
            type="text"
            placeholder="아이디(이메일 주소)"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

          <input
            {...register('password', { required: '비밀번호를 입력해주세요.' })}
            className="p-3 border rounded text-sm outline-none font-normal"
            type="password"
            placeholder="비밀번호"
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}

          <button className="bg-primary text-sm text-white font-extrabold rounded-lg py-3 px-52" type="submit">
            로그인
          </button>
          <hr />
          <button className="bg-[#FEE500] text-sm font-bold rounded-lg py-3" type="button">
            카카오로 시작하기
          </button>
          <p className="text-sm text-center">
            아직 별별스토어의 회원이 아니라면?{' '}
            <Link className="text-blue-500 font-bold hover:underline" href={'/signup'}>
              회원가입
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
}
