'use client';

import '@/app/globals.css';

import { ICart, IOrderForm } from '@/app/util/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

import Orderer from './Orderer';
import Receiver from './Receiver';
import { appFirestore } from '@/firebase/config';
import { getOrderNum } from '@/app/util/getOrderNum';
import useStore from '@/store/useStore';

export default function OrderForm({ orderProducts }: { orderProducts: ICart[] }) {
  const { userId } = useStore();
  const { register, handleSubmit, watch, setValue } = useForm<IOrderForm>();
  const orderPrice = orderProducts.reduce((total, item) => total + item.salePrice * item.quantity, 0);

  const handleUniqueOrderNumber = async (): Promise<string> => {
    let orderNum = '';
    let isUnique = false;

    while (!isUnique) {
      orderNum = getOrderNum();
      const orderQuery = query(collection(appFirestore, 'orders'), where('orderNum', '==', orderNum));
      const orderSnapshot = await getDocs(orderQuery);
      if (orderSnapshot.empty) {
        isUnique = true;
      }
    }

    return orderNum;
  };

  const onSubmit: SubmitHandler<IOrderForm> = async (data) => {
    try {
      const orderNum = await handleUniqueOrderNumber();

      const userDoc = doc(collection(appFirestore, 'orders'));
      await setDoc(userDoc, {
        userId: userId,
        productPrice: orderPrice,
        deliveryPrice: 2500,
        products: orderProducts,
        orderer: data.orderer,
        receiver: data.receiver,
        orderedAt: new Date().toISOString(),
        orderNum: orderNum,
      });

      const cartQuery = query(collection(appFirestore, 'cart'), where('userId', '==', userId));
      const cartSnapshot = await getDocs(cartQuery);
      for (const docSnap of cartSnapshot.docs) {
        const cartData = docSnap.data();
        for (const orderProduct of orderProducts) {
          if (cartData.product.option === orderProduct.option) {
            await deleteDoc(docSnap.ref);
          }
        }
      }

      sessionStorage.removeItem('orderProducts');

      alert('정상적으로 구매 완료되었습니다.');
    } catch {
      alert('구매 도중 오류가 발생했습니다.');
    }
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
