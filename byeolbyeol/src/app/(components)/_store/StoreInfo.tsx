'use client';

import { PiMinus, PiPlus } from 'react-icons/pi';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IStore } from '@/app/util/types';
import Image from 'next/image';
import { appFirestore } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';

export default function StoreInfo({ store }: { store: IStore }) {
  const { follow, userId, setFollow } = useStore();
  const [isFollow, setIsFollow] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (follow && store?.storeId) {
      setIsFollow(follow.includes(store.storeId));
      setFollowCount(store.follower);
    }
  }, [follow, store.storeId, store.follower]);

  const handleFollow = async () => {
    if (!userId) {
      router.push('/login');
      return;
    }
    try {
      const userQuery = query(collection(appFirestore, 'users'), where('userId', '==', userId));
      const userSnapshot = await getDocs(userQuery);
      const userDoc = userSnapshot.docs[0];
      const userRef = doc(appFirestore, 'users', userDoc.id);

      const storeQuery = query(collection(appFirestore, 'store'), where('storeId', '==', store.storeId));
      const storeSnapshot = await getDocs(storeQuery);
      const storeDoc = storeSnapshot.docs[0];
      const storeRef = doc(appFirestore, 'store', storeDoc.id);

      if (follow?.includes(store.storeId)) {
        await updateDoc(userRef, {
          follow: arrayRemove(store.storeId),
        });

        await updateDoc(storeRef, {
          follower: increment(-1),
        });

        const newFollow = follow.filter((id) => id !== store.storeId);
        setFollow(newFollow);
        setIsFollow(false);
        setFollowCount(followCount - 1);
      } else {
        await updateDoc(userRef, {
          follow: arrayUnion(store.storeId),
        });

        await updateDoc(storeRef, {
          follower: increment(1),
        });

        if (follow) setFollow([...follow, store.storeId]);
        setIsFollow(true);
        setFollowCount(followCount + 1);
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="w-[1020px] mt-8 rounded-lg border flex">
      <div className="relative w-96 w-48 object-cover">
        <Image className="rounded-l-lg" src={store.storeImg} alt={store.storeName} fill priority />
      </div>

      <div className="px-10 py-5 flex-1">
        <div className="flex gap-1">
          {store.tag.map((tag, key) => (
            <p className="font-extrabold text-sm" key={key}>
              #{tag}
            </p>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <h1 className="mt-1 text-primary text-4xl font-black">{store.storeName}</h1>
          <button className="min-w-36 bg-primary text-white py-2 px-4 flex text-sm" onClick={handleFollow}>
            {isFollow ? '팔로우 취소' : `팔로우(${followCount})`}
            {isFollow ? <PiMinus className="text-lg ml-5" /> : <PiPlus className="text-lg ml-8" />}
          </button>
        </div>
        <p className="mt-2 text-sm">{store.location}</p>
        <small>{store.locationInfo}</small>
        <p className="mt-5">{store.description}</p>
      </div>
    </div>
  );
}
