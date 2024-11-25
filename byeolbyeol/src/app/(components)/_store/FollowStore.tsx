'use client';

import { arrayRemove, collection, doc, getDocs, increment, query, updateDoc, where } from 'firebase/firestore';

import { IStore } from '@/app/util/types';
import Image from 'next/image';
import Link from 'next/link';
import { appFirestore } from '@/firebase/config';
import useStore from '@/store/useStore';

export default function FollowStore({ store }: { store: IStore }) {
  const { userId, follow, setFollow } = useStore();

  const handleFollowDelete = async () => {
    try {
      const userQuery = query(collection(appFirestore, 'users'), where('userId', '==', userId));
      const userSnapshot = await getDocs(userQuery);
      const userDoc = userSnapshot.docs[0];
      const userRef = doc(appFirestore, 'users', userDoc.id);

      const storeQuery = query(collection(appFirestore, 'store'), where('storeId', '==', store.storeId));
      const storeSnapshot = await getDocs(storeQuery);
      const storeDoc = storeSnapshot.docs[0];
      const storeRef = doc(appFirestore, 'store', storeDoc.id);

      await updateDoc(userRef, {
        follow: arrayRemove(store.storeId),
      });

      await updateDoc(storeRef, {
        follower: increment(-1),
      });

      const newFollow = (follow ?? []).filter((id) => id !== store.storeId);
      console.log(newFollow);
      setFollow(newFollow);
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <li className="min-w-[450px] flex px-5 py-3 items-center justify-between border rounded-lg" title={store.storeName}>
      <div className="flex gap-4 items-center">
        <Link href={`/store/${store.storeId}`} className="relative rounded-full w-14 h-14">
          <Image className="w-14 h-14 rounded-full object-cover" src={store.storeImg} alt={store.storeName} fill />
        </Link>
        <div>
          <h2 className="text-primary font-black text-2xl">
            <Link href={`/store/${store.storeId}`}>{store.storeName}</Link>
          </h2>
          <div className="flex gap-1">
            {store.tag.map((str, key) => (
              <p className="font-bold text-xs" key={key}>
                #{str}
              </p>
            ))}
          </div>
        </div>
      </div>

      <button className="text-xs hover:underline" onClick={handleFollowDelete}>
        제거
      </button>
    </li>
  );
}
