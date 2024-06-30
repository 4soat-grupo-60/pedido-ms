import OrderItemMessageModel from "./order_item.message.model";

export default interface OrderMessageModel {
  client_cpf?: string;
  items: OrderItemMessageModel[];
  id: number;
  payment_id: string;
  payment_date: Date;
  status: string;
  total: number;
  created_at?: Date;
  updated_at?: Date;
}
