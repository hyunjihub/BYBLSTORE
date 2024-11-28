'use client';

import '@/app/globals.css';

import { appAuth, appFirestore } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useSaveCart from '@/app/hooks/useSaveCart';
import { useState } from 'react';
import useStore from '@/store/useStore';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isNotUser, setIsNotUser] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ shouldUseNativeValidation: false });
  const { setData, userId } = useStore();
  const router = useRouter();

  useSaveCart(userId);

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await signInWithEmailAndPassword(appAuth, data.email, data.password);
      const userDocs = await getDocs(query(collection(appFirestore, 'users'), where('email', '==', user.user.email)));
      if (!userDocs.empty) {
        const userData = userDocs.docs[0].data();

        const userInfo = {
          userId: userData.userId,
          profileImg: userData.profileImg,
          nickname: userData.nickname,
          follow: userData.follow,
        };
        setData(userInfo);

        router.push('/');
      } else {
        setIsNotUser(true);
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.getModifierState('CapsLock')) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  return (
    <form className="mx-auto flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: '이메일 주소를 입력해주세요.',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '유효한 이메일 주소를 입력해주세요.',
          },
        })}
        className="p-3 border rounded text-sm outline-none font-normal"
        type="text"
        placeholder="아이디(이메일 주소)"
        onKeyUp={handleKeyUp}
      />
      <input
        {...register('password', { required: '비밀번호를 입력해주세요.' })}
        className="p-3 border rounded text-sm outline-none font-normal"
        type="password"
        placeholder="비밀번호"
        onKeyUp={handleKeyUp}
      />
      {errors.email && <span className="text-red-500 text-xs font-bold">{errors.email.message}</span>}
      {!errors.email && errors.password && (
        <span className="text-red-500 text-xs font-bold">{errors.password.message}</span>
      )}
      {isNotUser && <span className="text-red-500 text-xs font-bold">사용자 정보를 찾을 수 없습니다.</span>}
      {isCapsLockOn && <span className="text-red-500 text-xs font-bold">Caps Lock이 켜져 있습니다.</span>}
      <button className="bg-primary text-sm text-white font-extrabold rounded-lg py-3 px-52" type="submit">
        로그인
      </button>
    </form>
  );
}
