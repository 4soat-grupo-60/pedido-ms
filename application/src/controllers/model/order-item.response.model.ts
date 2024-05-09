import {ProductResponse} from "./product.response.model";


export type OrderItemResponse = {
  id: number;
  quantity: number;
  price: number;
  total: number;
  product: ProductResponse;
};
