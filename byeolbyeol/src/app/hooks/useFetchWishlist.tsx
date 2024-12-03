import { collection, getDocs, query, where } from 'firebase/firestore';

import { appFirestore } from '@/firebase/config';

export default async function useFetchWishList({ userId }: { userId: string }) {
  try {
    const userQuery = query(collection(appFirestore, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) return [];
    return querySnapshot.docs[0].data().wish;
  } catch {
    alert('위시리스트 정보를 불러올 수 없습니다. 다시 시도해주세요.');
  }
}
