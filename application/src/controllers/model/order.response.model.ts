import { OrderItemResponse } from "./order-item.response.model";
import { PaymentResponse } from "./payment.response.model";
import { CPF } from "../../domain/value_object/cpf";

export type OrderResponse = {
  client_cpf?: CPF;
  payment?: PaymentResponse;
  items: OrderItemResponse[];
  id: number;
  status: string;
  total: number;
  created_at?: Date;
  updated_at?: Date;
};
