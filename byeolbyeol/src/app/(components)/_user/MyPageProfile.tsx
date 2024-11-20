'use client';

import '@/app/globals.css';

import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useRef, useState } from 'react';

import { BsFillCameraFill } from 'react-icons/bs';
import Image from 'next/image';
import { IoMdSettings } from 'react-icons/io';
import { appFirestore } from '@/firebase/config';
import handleImageUpload from '../_image/imageUpload';
import profile from '/public/images/tmp.jpg';
import useStore from '@/store/useStore';

export default function MyPageProfile() {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [modifiedInfo, setModifiedInfo] = useState<{
    profileImg: string | null;
    nickname: string | null;
  }>({
    profileImg: null,
    nickname: null,
  });

  const { userId, nickname, profileImg } = useStore() as {
    userId: number | null;
    nickname: string | null;
    profileImg: string | null;
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        nickname: modifiedInfo.nickname || nickname,
        profileImg: modifiedInfo.profileImg || profileImg,
      };

      try {
        await updateDoc(userRef, updatedData);
        alert('회원 정보가 성공적으로 수정되었습니다.');
        setIsModifyMode(true);
      } catch (error) {
        console.log(error);
        alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      alert('회원 정보를 찾을 수 없습니다.');
    }
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await handleImageUpload(e);
    setModifiedInfo((prevState) => ({
      ...prevState,
      nickname: url!,
    }));
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedInfo((prevState) => ({
      ...prevState,
      nickname: e.target.value,
    }));
  };

  return (
    <>
      <div className="mt-7 mb-3 w-[200px] h-[200px] relative rounded-full">
        <Image
          className="w-[200px] h-[200px] rounded-full object-cover"
          src={isModifyMode ? modifiedInfo.profileImg || profile : profileImg || profile}
          alt="profile"
          fill
        />
        {isModifyMode && (
          <>
            <button
              className="absolute right-0 bottom-5 w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center"
              onClick={handleUpload}
            >
              <BsFillCameraFill className="text-3xl" />
            </button>
            <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => handleImageChange(e)} />
          </>
        )}
      </div>
      <div className="flex items-center">
        {isModifyMode ? (
          <input
            className="w-40 px-1 border-b border-gray-500 text-2xl font-extrabold outline-none"
            placeholder="닉네임"
            value={modifiedInfo.nickname || ''}
            onChange={handleNicknameChange}
          />
        ) : (
          <p className="text-2xl pt-1 pl-3 font-extrabold">{nickname}</p>
        )}
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
          <IoMdSettings
            className="cursor-pointer ml-3 text-3xl text-gray-500"
            onClick={() => handleModify('profile')}
          />
        )}
      </div>
    </>
  );
}
