import { OrderItem } from "../../domain/entities/orderItem";
import { OrderItemResponse } from "../model/order-item.response.model";
import { ProductPresenter } from "./product.presenter";

export class OrderItemPresenter {
  static map(o: OrderItem): OrderItemResponse {
    return {
      id: o.id,
      quantity: o.quantity,
      price: o.value,
      total: o.total,
      product: o.product ? ProductPresenter.map(o.product) : null,
    };
  }
}
