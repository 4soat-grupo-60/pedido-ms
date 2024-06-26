import { Order } from "../../domain/entities/order";
import { CPF } from "../../domain/value_object/cpf";
import OrderModel from "../repositories/model/order.model";
import OrderItemModelMapper from "./order_item.mapper";
import PaymentModelMapper from "./payment.mapper";

export default class OrderModelMapper {
  static map(d: OrderModel): Order {
    return Order.New(
      d.id,
      d.items.map(OrderItemModelMapper.map),
      d.total.toNumber(),
      d.status,
      d.client_cpf ? new CPF(d.client_cpf) : null,
      d.payment_id,
      d.payment_date,
      d.created_at,
      d.updated_at
    );
  }
}
