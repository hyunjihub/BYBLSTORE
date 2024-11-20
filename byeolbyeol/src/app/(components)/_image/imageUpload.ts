import '@/app/globals.css';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { appStorage } from '@/firebase/config';
import { v4 as uuidv4 } from 'uuid';

export default async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
  if (!e.target.files) return;

  const image = e.target.files[0];

  const extensionCheck = /(.*?)\.(jpg|jpeg|png)$/;
  if (!image.name.match(extensionCheck)) {
    alert('지원하지 않는 파일 형식입니다.\njpg/jpeg 또는 png 형식을 선택해주세요.');
    return;
  }

  if (image.size > 1024 ** 2 * 5) {
    alert('이미지 파일 크기가 너무 큽니다.\n5MB 미만 이미지를 선택해주세요.');
    return;
  }

  try {
    const fileRef = ref(appStorage, `profile/${uuidv4()}`);
    await uploadBytes(fileRef, image);
    return await getDownloadURL(fileRef);
  } catch {
    alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
  }
}
