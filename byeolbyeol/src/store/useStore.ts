import { createJSONStorage, persist } from 'zustand/middleware';

import { create } from 'zustand';

interface UserData {
  userId: number | null;
  profileImg: string | null;
  nickname: string | null;
}

interface UserState {
  userId: number | null;
  profileImg: string | null;
  nickname: string | null;
  setData: (newData: UserData) => void;
}

export const useStore = create(
  persist<UserState>(
    (set) => ({
      userId: null,
      profileImg: null,
      nickname: null,
      setData: (newData) =>
        set(() => ({
          userId: newData.userId,
          profileImg: newData.profileImg,
          nickname: newData.nickname,
        })),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
