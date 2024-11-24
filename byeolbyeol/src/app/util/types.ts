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
  name: string;
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
