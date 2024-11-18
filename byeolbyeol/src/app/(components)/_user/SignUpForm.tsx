'use client';

import '@/app/globals.css';

import { appAuth, appFirestore } from '@/firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';

import SignUpInput from './SignUpInput';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export default function SignUpForm() {
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
        userId: user.uid,
        email: data.email,
        nickname: data.nickname,
        profileImg: '',
        type: 'email',
        follow: [],
        createdAt: new Date().toISOString(),
      });
      alert('정상적으로 가입되었습니다.');
      router.push('/');
    } catch (error) {
      console.log(error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form className="mx-auto flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <SignUpInput register={register} watch={watch} errors={errors} />
      <button className="mt-3 bg-primary text-sm text-white font-extrabold rounded-lg py-3 px-[200px]" type="submit">
        회원가입
      </button>
    </form>
  );
}
