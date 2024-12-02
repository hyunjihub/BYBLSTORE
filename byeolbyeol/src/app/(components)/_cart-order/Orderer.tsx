'use client';

import '@/app/globals.css';

import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IOrderForm } from '@/app/util/types';
import { useDaumPostcodePopup } from 'react-daum-postcode';

interface OrdererProps {
  register: UseFormRegister<IOrderForm>;
  setValue: UseFormSetValue<IOrderForm>;
}

export default function Orderer({ register, setValue }: OrdererProps) {
  const open = useDaumPostcodePopup();

  const handlePostCode = (type: 'orderer' | 'receiver') => {
    open({
      onComplete: (data) => {
        setValue(`${type}.zipCode`, data.zonecode);
        setValue(`${type}.address`, data.roadAddress);
      },
      width: 500,
      height: 600,
      left: window.innerWidth / 2 - 500 / 2,
      top: window.innerHeight / 2 - 600 / 2,
    });
  };

  return (
    <section className="w-5/12">
      <h2 className="text-2xl font-extrabold border-b-2 border-gray-300 pb-3">주문자 정보</h2>
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex gap-3">
          <input
            className="w-1/4 border py-1.5 px-3 text-sm"
            placeholder="주문자명"
            {...register('orderer.name', { required: '주문자명을 입력해주세요.' })}
          />
          <input
            className="w-2/4 border py-1.5 px-3 text-sm flex-1"
            type="number"
            placeholder="전화번호 (01012345678)"
            {...register('orderer.phone', { required: '전화번호를 입력해주세요.' })}
          />
        </div>
        <div className="flex">
          <input
            className="border py-1.5 px-3 text-sm"
            placeholder="우편번호"
            disabled={true}
            {...register('orderer.zipCode', { required: '우편번호를 입력해주세요.' })}
          />
          <button
            type="button"
            className="px-3 text-white text-sm bg-primary"
            onClick={() => handlePostCode('orderer')}
          >
            우편번호 찾기
          </button>
        </div>
        <input
          className="border py-1.5 px-3 text-sm"
          placeholder="주소"
          disabled={true}
          {...register('orderer.address', { required: '주소를 입력해주세요.' })}
        />
        <input className="border py-1.5 px-3 text-sm" placeholder="상세주소" {...register('orderer.detailAddress')} />
      </div>
    </section>
  );
}
