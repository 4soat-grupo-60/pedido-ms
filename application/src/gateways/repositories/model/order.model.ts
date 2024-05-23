import { Prisma } from "@prisma/client";
import OrderItemModel from "./order_item.model";
import PaymentModel from "./payment.model";

export default interface OrderModel {
  client_cpf?: string;
  payment?: PaymentModel;
  items: OrderItemModel[];
  id: number;
  payment_id: number;
  status: string;
  total: Prisma.Decimal;
  created_at?: Date;
  updated_at?: Date;
}
