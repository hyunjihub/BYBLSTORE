import { ICart } from '@/app/util/types';
import addCart from '@/app/util/addCart';
import { useEffect } from 'react';

const useSaveCart = (userId: string | null) => {
  useEffect(() => {
    const syncCart = async () => {
      if (!userId) return;

      const cartDataString = sessionStorage.getItem('cart');
      if (cartDataString) {
        const cartData: ICart[] = JSON.parse(cartDataString);
        await Promise.all(cartData.map((item) => addCart(item, userId)));
        sessionStorage.removeItem('cart');
      }
    };

    syncCart();
  }, [userId]);
};

export default useSaveCart;
