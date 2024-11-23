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
