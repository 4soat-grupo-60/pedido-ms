import {OrderItem} from "../../domain/entities/orderItem";
import OrderItemModel from "../repositories/model/order_item.model";
import ProductMapper from "./product.mapper";
import OrderItemMessageModel from "../services/model/order_item.message.model";

export default class OrderItemModelMapper {
  static map(d: OrderItemModel): OrderItem {
    return OrderItem.New(
      d.id,
      d.orderId,
      ProductMapper.map(d),
      d.quantity.toNumber(),
      d.price.toNumber(),
      d.total.toNumber()
    );
  }

  static toMessage(d: OrderItem): OrderItemMessageModel {
    return {
      id: d.id,
      order_id: d.orderId,
      price: d.value,
      product_category: d.product.getCategory(),
      product_description: d.product.getDescription(),
      product_id: d.product.getId(),
      product_name: d.product.getName(),
      product_price: d.product.getValueProduct(),
      quantity: d.quantity,
      total: d.total
    }
  }
}
