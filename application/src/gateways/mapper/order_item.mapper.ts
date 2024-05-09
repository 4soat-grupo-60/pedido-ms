import { OrderItem } from "../../domain/entities/orderItem";
import OrderItemModel from "../model/order_item.model";
import ProductMapper from "./product.mapper";

export default class OrderItemModelMapper {
  static map(d: OrderItemModel): OrderItem {
    return OrderItem.New(
      d.id,
      d.orderId,
      ProductMapper.map(d.product),
      d.quantity.toNumber(),
      d.price.toNumber(),
      d.total.toNumber()
    );
  }
}
