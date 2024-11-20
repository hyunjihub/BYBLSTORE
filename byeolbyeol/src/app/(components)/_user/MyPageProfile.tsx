'use client';

import '@/app/globals.css';

import { useRef, useState } from 'react';

import { BsFillCameraFill } from 'react-icons/bs';
import Image from 'next/image';
import ModifyMode from './ModifyMode';
import handleImageUpload from '../_image/imageUpload';
import profile from '/public/images/tmp.jpg';
import useStore from '@/store/useStore';

export default function MyPageProfile() {
  const { nickname, profileImg } = useStore() as {
    nickname: string | null;
    profileImg: string | null;
  };
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [modifiedInfo, setModifiedInfo] = useState<{
    profileImg: string | null;
    nickname: string | null;
  }>({
    profileImg: null,
    nickname: null,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        <ModifyMode
          isModifyMode={isModifyMode}
          setIsModifyMode={setIsModifyMode}
          modifiedInfo={modifiedInfo}
          setModifiedInfo={setModifiedInfo}
        />
      </div>
    </>
  );
}
