'use client';

import '@/app/globals.css';

import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import { IoMdSettings } from 'react-icons/io';
import { appFirestore } from '@/firebase/config';
import useStore from '@/store/useStore';

interface ModifyModeProps {
  isModifyMode: boolean;
  setIsModifyMode: (value: boolean) => void;
  modifiedInfo: {
    profileImg: string | null;
    nickname: string | null;
  };
  setModifiedInfo: (info: { profileImg: string | null; nickname: string | null }) => void;
}

export default function ModifyMode({ isModifyMode, setIsModifyMode, modifiedInfo, setModifiedInfo }: ModifyModeProps) {
  const { userId, nickname, profileImg, updateData } = useStore();

  const handleModify = (current: string) => {
    if (current === 'modify') {
      setIsModifyMode(false);
    } else {
      setIsModifyMode(true);
      setModifiedInfo({
        profileImg: profileImg,
        nickname: nickname,
      });
    }
  };

  const handleChangeInfo = async () => {
    const userQuery = query(collection(appFirestore, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(appFirestore, 'users', userDoc.id);

      const updatedData = {
        nickname: modifiedInfo.nickname || nickname || '',
        profileImg: modifiedInfo.profileImg || profileImg || '',
      };

      try {
        await updateDoc(userRef, updatedData);
        alert('회원 정보가 성공적으로 수정되었습니다.');
        updateData(updatedData);
        setIsModifyMode(true);
      } catch {
        alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      alert('회원 정보를 찾을 수 없습니다.');
    }
  };

  return (
    <>
      {isModifyMode ? (
        <div className="ml-4 flex items-center gap-2">
          <button className="bg-primary text-sm text-white font-bold rounded py-1 px-3" onClick={handleChangeInfo}>
            변경
          </button>
          <button
            className="border border-primary text-sm font-bold rounded py-1 px-3"
            onClick={() => handleModify('modify')}
          >
            취소
          </button>
        </div>
      ) : (
        <IoMdSettings className="cursor-pointer ml-3 text-3xl text-gray-500" onClick={() => handleModify('profile')} />
      )}
    </>
  );
}
