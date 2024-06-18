import {Prisma} from "@prisma/client";
import OrderItemModel from "./order_item.model";
import PaymentModel from "./payment.model";

export default interface OrderModel {
  client_cpf?: string;
  items: OrderItemModel[];
  id: number;
  payment_id: string;
  payment_date: Date;
  status: string;
  total: Prisma.Decimal;
  created_at?: Date;
  updated_at?: Date;
}
