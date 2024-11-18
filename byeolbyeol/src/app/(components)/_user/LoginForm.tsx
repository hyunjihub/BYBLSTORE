'use client';

import '@/app/globals.css';

import { appAuth, appFirestore } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useStore from '@/store/useStore';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isNotUser, setIsNotUser] = useState(false);
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
        setIsNotUser(true);
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
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
      {isNotUser && <span className="text-red-500 text-xs">사용자 정보를 찾을 수 없습니다.</span>}
      <button className="bg-primary text-sm text-white font-extrabold rounded-lg py-3 px-52" type="submit">
        로그인
      </button>
    </form>
  );
}
