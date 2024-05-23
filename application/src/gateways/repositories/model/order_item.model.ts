import {Prisma} from "@prisma/client";
import ProductModel from "./product.model";

export default interface OrderItemModel {
  id: number;
  order_id: number;
  product_id: string;
  product_name: string;
  product_description: string;
  product_category: string;
  product_price: Prisma.Decimal
  quantity: Prisma.Decimal;
  price: Prisma.Decimal;
  total: Prisma.Decimal;
  orderId?: number;
}
