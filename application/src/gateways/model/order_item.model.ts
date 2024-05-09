import { Prisma } from "@prisma/client";
import ProductModel from "./product.model";

export default interface OrderItemModel {
  id: number;
  order_id: number;
  product_id: number;
  quantity: Prisma.Decimal;
  price: Prisma.Decimal;
  total: Prisma.Decimal;
  orderId?: number;
  product: ProductModel;
}
