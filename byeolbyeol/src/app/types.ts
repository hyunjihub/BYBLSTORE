import { Timestamp } from 'firebase/firestore';

export interface IProduct {
  productId: number;
  productName: string;
  originalPrice: number;
  salePrice: number;
  storeId: number;
  productImg: Array<string>;
  options: Array<string> | null;
  productInfo: Array<string>;
  createdAt: Timestamp;
}
