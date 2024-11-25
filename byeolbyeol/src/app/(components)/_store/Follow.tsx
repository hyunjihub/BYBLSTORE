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

import { appFirestore } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';

interface followProps {
  storeId: number;
  isFollow: boolean;
  setIsFollow: React.Dispatch<React.SetStateAction<boolean>>;
  followCount: number;
  setFollowCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Follow({ storeId, isFollow, setIsFollow, followCount, setFollowCount }: followProps) {
  const { follow, userId, setFollow } = useStore();
  const router = useRouter();

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

      const storeQuery = query(collection(appFirestore, 'store'), where('storeId', '==', storeId));
      const storeSnapshot = await getDocs(storeQuery);
      const storeDoc = storeSnapshot.docs[0];
      const storeRef = doc(appFirestore, 'store', storeDoc.id);

      if (follow?.includes(storeId)) {
        await updateDoc(userRef, {
          follow: arrayRemove(storeId),
        });

        await updateDoc(storeRef, {
          follower: increment(-1),
        });

        const newFollow = follow.filter((id) => id !== storeId);
        setFollow(newFollow);
        setIsFollow(false);
        setFollowCount(followCount - 1);
      } else {
        await updateDoc(userRef, {
          follow: arrayUnion(storeId),
        });

        await updateDoc(storeRef, {
          follower: increment(1),
        });

        if (follow) setFollow([...follow, storeId]);
        setIsFollow(true);
        setFollowCount(followCount + 1);
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <button className="min-w-36 bg-primary text-white py-2 px-4 flex text-sm" onClick={handleFollow}>
      {isFollow ? '팔로우 취소' : `팔로우(${followCount})`}
      {isFollow ? <PiMinus className="text-lg ml-5" /> : <PiPlus className="text-lg ml-8" />}
    </button>
  );
}
