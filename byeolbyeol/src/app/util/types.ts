import { Timestamp } from 'firebase/firestore';

export interface IProduct {
  productId: number;
  productName: string;
  originalPrice: number;
  salePrice: number;
  storeId: number;
  productImg: Array<string>;
  options: Array<string>;
  productInfo: Array<string>;
  createdAt: Timestamp;
}

export interface ISelectedOption {
  option: string;
  quantity: number;
}

export interface IStore {
  storeId: number;
  storeName: string;
  storeImg: string;
  description: string;
  follower: number;
  instagram: string;
  location: string;
  locationInfo: string;
  tag: Array<string>;
}

export interface IUser {
  userId: string | null;
  nickname: string | null;
  follow: Array<number> | null;
  profileImg: string | null;
}

export interface ICart {
  productId: number;
  option: string;
  quantity: number;
  storeName: string;
  salePrice: number;
}

export interface ICartProduct {
  productName: string;
  originalPrice: number;
  productImg: Array<string>;
  storeId: number;
}

export interface IOrderForm {
  orderer: IOrderer;
  receiver: IReceiver;
}

export interface IOrderer {
  name?: string | null;
  phone?: number | null;
  zipCode?: string | null;
  address?: string | null;
  detailAddress?: string | null;
}

export interface IReceiver extends IOrderer {
  deliveryMessage: string | null;
  customMessage: string | null;
}
