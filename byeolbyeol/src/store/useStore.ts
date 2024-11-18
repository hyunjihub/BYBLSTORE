import { create } from 'zustand';

interface UserData {
  userId: number;
  profileImg: string;
  nickname: string;
}

interface UserState {
  userId: number | null;
  profileImg: string | null;
  nickname: string | null;
  setData: (newData: UserData) => void;
}

const useStore = create<UserState>((set) => ({
  userId: null,
  profileImg: null,
  nickname: null,
  setData: (newData) =>
    set(() => ({
      userId: newData.userId,
      profileImg: newData.profileImg,
      nickname: newData.nickname,
    })),
}));

export default useStore;
