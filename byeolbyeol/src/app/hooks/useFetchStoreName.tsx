import { collection, getDocs, query, where } from 'firebase/firestore';

import { appFirestore } from '@/firebase/config';

export default async function useFetchStoreName({ storeId }: { storeId: number }) {
  try {
    const q = query(collection(appFirestore, 'store'), where('storeId', '==', storeId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const storeData = querySnapshot.docs[0].data();
      return storeData.storeName;
    } else {
      alert('스토어 정보를 찾을 수 없습니다.');
      return;
    }
  } catch {
    alert('오류가 발생했습니다. 다시 시도해주세요.');
  }
}
