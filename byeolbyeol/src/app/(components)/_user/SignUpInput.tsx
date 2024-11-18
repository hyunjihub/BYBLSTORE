'use client';

import '@/app/globals.css';

import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

interface SignUpInputProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
}

export default function SignUpInput({ register, errors, watch }: SignUpInputProps) {
  return (
    <>
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
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
              message: '올바른 이메일 주소를 입력해주세요.',
            },
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
            validate: (value: string) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
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
    </>
  );
}
