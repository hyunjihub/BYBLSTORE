import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

import { ICart } from './types';
import { appFirestore } from '@/firebase/config';

export default async function addCart(product: ICart, userId: string | null = null) {
  if (userId) {
    try {
      const cartQuery = query(
        collection(appFirestore, 'cart'),
        where('userId', '==', userId),
        where('productId', '==', product.productId),
        where('product.option', '==', product.option)
      );
      const cartSnapshot = await getDocs(cartQuery);

      if (!cartSnapshot.empty) {
        const cartDocRef = cartSnapshot.docs[0].ref;
        const currentProduct = cartSnapshot.docs[0].data().product;
        await updateDoc(cartDocRef, {
          product: {
            ...currentProduct,
            quantity: currentProduct.quantity + product.quantity,
          },
        });
      } else {
        const cartDoc = doc(collection(appFirestore, 'cart'));
        await setDoc(cartDoc, {
          userId: userId,
          productId: product.productId,
          product: {
            option: product.option,
            quantity: product.quantity,
          },
          storeName: product.storeName,
          salePrice: product.salePrice,
        });
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  } else {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

    const existingProductIndex = cart.findIndex(
      (item: ICart) => item.productId === product.productId && item.option === product.option
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += product.quantity;
    } else {
      cart.push(product);
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}
