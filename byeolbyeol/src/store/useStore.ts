import { createJSONStorage, persist } from 'zustand/middleware';

import { IUser } from '@/app/util/types';
import { create } from 'zustand';

interface UserState {
  userId: string | null;
  profileImg: string | null;
  nickname: string | null;
  follow: Array<number> | null;
  setData: (newData: IUser) => void;
  setFollow: (newFollow: Array<number>) => void;
}

export const useStore = create(
  persist<UserState>(
    (set) => ({
      userId: null,
      profileImg: null,
      nickname: null,
      follow: null,
      setData: (newData) =>
        set(() => ({
          userId: newData.userId,
          profileImg: newData.profileImg,
          nickname: newData.nickname,
          follow: newData.follow,
        })),
      setFollow: (newFollow: Array<number>) =>
        set(() => ({
          follow: newFollow,
        })),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
