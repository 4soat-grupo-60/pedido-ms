import {Order} from "../../domain/entities/order";
import {OrderResponse} from "../model/order.response.model";
import {OrderItemPresenter} from "./order-item.presenter";
import {PaymentPresenter} from "./payment.presenter";
import {Payment} from "../../domain/entities/payment";

export class OrderPresenter {
  static mapList(data: Order[]): OrderResponse[] {
    return data.map(OrderPresenter.map);
  }

  static map(data: Order): OrderResponse {
    return {
      client_cpf: data.clientCPF ? data.clientCPF : null,
      payment: data.paymentId ? {id: data.paymentId, paid_at: data.paymentDate} : null,
      items: data.items.map(OrderItemPresenter.map),
      id: data.id,
      status: data.status.getStatus(),
      total: data.valueTotal.getValueMoney(),
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  }
}
