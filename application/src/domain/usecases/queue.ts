import { Order } from "../entities/order";
import { OrderStatus } from "../value_object/orderStatus";
import { IOrderGateway } from "../../interfaces/gateways";

export class OrderQueueUseCases {
  static async getPendingOrders(
    orderGateway: IOrderGateway
  ): Promise<Array<Order>> {
    return orderGateway.getOrderByStatus(OrderStatus.AGUARDANDO_PREPARO);
  }

  static async getPreparingOrders(
    orderGateway: IOrderGateway
  ): Promise<Array<Order>> {
    return orderGateway.getOrderByStatus(OrderStatus.EM_PREPARACAO);
  }

  static async getPreparedOrders(
    orderGateway: IOrderGateway
  ): Promise<Array<Order>> {
    return orderGateway.getOrderByStatus(OrderStatus.PRONTO);
  }
}
