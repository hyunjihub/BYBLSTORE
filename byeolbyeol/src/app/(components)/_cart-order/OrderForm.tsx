'use client';

import '@/app/globals.css';

import { SubmitHandler, useForm } from 'react-hook-form';

import { IOrderForm } from '@/app/util/types';
import Orderer from './Orderer';
import Receiver from './Receiver';

export default function OrderForm() {
  const { register, handleSubmit, watch, setValue } = useForm<IOrderForm>();

  const onSubmit: SubmitHandler<IOrderForm> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-14 w-full flex flex-col gap-10">
      <div className="flex justify-between">
        <Orderer register={register} setValue={setValue} />
        <Receiver register={register} watch={watch} setValue={setValue} />
      </div>

      <button type="submit" className="w-full py-3 mb-20 bg-primary text-white font-extrabold rounded-lg">
        결제하기
      </button>
    </form>
  );
}
