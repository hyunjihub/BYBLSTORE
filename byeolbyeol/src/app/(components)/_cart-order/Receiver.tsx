'use client';

import '@/app/globals.css';

import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { IOrderForm } from '@/app/util/types';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState } from 'react';

interface ReceiverProps {
  register: UseFormRegister<IOrderForm>;
  setValue: UseFormSetValue<IOrderForm>;
  watch: UseFormWatch<IOrderForm>;
}

export default function Receiver({ register, setValue, watch }: ReceiverProps) {
  const [isSelfMessage, setIsSelfMessage] = useState(false);
  const open = useDaumPostcodePopup();

  const copyOrdererInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const ordererInfo = watch('orderer');
      setValue('receiver', { ...ordererInfo, deliveryMessage: '', customMessage: '' });
    } else {
      setValue('receiver', {
        name: '',
        phone: null,
        zipCode: null,
        address: '',
        detailAddress: '',
        deliveryMessage: '',
        customMessage: '',
      });
    }
  };

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
    <section className="w-6/12">
      <div className="flex gap-2 border-b-2 border-gray-300">
        <h2 className="text-2xl font-extrabold pb-3">수령인 정보</h2>
        <label className="flex items-center gap-2 text-sm mb-1">
          <input type="checkbox" onChange={(e) => copyOrdererInfo(e)} /> 주문자 정보와 동일
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div className="flex gap-3">
          <input
            className="w-1/4 border py-1.5 px-3 text-sm"
            placeholder="수령인명"
            {...register('receiver.name', { required: '수령인명을 입력해주세요.' })}
          />
          <input
            className="w-2/4 border py-1.5 px-3 text-sm flex-1"
            type="number"
            placeholder="전화번호 (01012345678)"
            {...register('receiver.phone', { required: '전화번호를 입력해주세요.' })}
          />
        </div>
        <div className="flex">
          <input
            className="border py-1.5 px-3 text-sm"
            placeholder="우편번호"
            disabled={true}
            {...register('receiver.zipCode', { required: '우편번호를 입력해주세요.' })}
          />
          <button
            type="button"
            className="px-3 text-white text-sm bg-primary"
            onClick={() => handlePostCode('receiver')}
          >
            우편번호 찾기
          </button>
        </div>
        <input
          className="border py-1.5 px-3 text-sm"
          placeholder="주소"
          disabled={true}
          {...register('receiver.address', { required: '주소를 입력해주세요.' })}
        />
        <input className="border py-1.5 px-3 text-sm" placeholder="상세주소" {...register('receiver.detailAddress')} />
        <div className="relative w-full">
          <select
            className="border w-full py-1.5 px-3 text-sm"
            {...register('receiver.deliveryMessage')}
            onChange={(e) => setIsSelfMessage(e.target.value === 'option5')}
          >
            <option value="">배송메시지를 선택해주세요.</option>
            <option value="option1">문 앞에 놓아 주시면 돼요.</option>
            <option value="option2">직접 받을게요. (부재시 문 앞)</option>
            <option value="option3">벨 누르지 말아주세요.</option>
            <option value="option4">배송 전에 미리 연락주세요.</option>
            <option value="option5">직접 입력하기</option>
          </select>
          <IoMdArrowDropdown className="absolute right-3 top-2 text-xl pointer-events-none" />
        </div>

        {isSelfMessage && (
          <input
            className="border py-1.5 px-3 text-sm"
            {...register('receiver.customMessage')}
            placeholder="배송메시지"
          />
        )}
      </div>
    </section>
  );
}
